var key = require("./keys.js");
var mysql = require("mysql");
var Table = require("cli-table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: key.keySQL,
  database: "bamazon"
});

function managerPrompt () {
  inquirer.prompt({
    name: "choice",
    type: "list",
    message: "What would you like to do?",
    choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product", "Exit"]
  }).then(function (answer) {
    determineAction(answer.choice);
  });
};

function determineAction (action) {
  switch (action) {
    case "View Products For Sale":
      viewProductsForSale();
      break;
    case "View Low Inventory":
      viewLowInventory();
      break;
    case "Add To Inventory":
      addToInventory();
      break;
    case "Add New Product":
      addNewProduct();
      break;
    case "Exit":
      connection.end();
  }
};

function viewProductsForSale () {
  var table = new Table({
    head: ["ID #", "Product", "Price", "Stock"],
    colWidths: [8, 30, 10, 10],
    chars: { "top": "═",
      "top-mid": "╤",
      "top-left": "╔",
      "top-right": "╗",
      "bottom": "═",
      "bottom-mid": "╧",
      "bottom-left": "╚",
      "bottom-right": "╝",
      "left": "║",
      "left-mid": "╟",
      "mid": "─",
      "mid-mid": "┼",
      "right": "║",
      "right-mid": "╢",
      "middle": "│" }
  });

  connection.query("SELECT * FROM products", function (err, result) {
    if (err) throw err;

    for (var i = 0; i < result.length; i++) {
      table.push([result[i].id, result[i].product_name, "$" + Number(result[i].price).toFixed(2), result[i].stock_quantity]);
    }

    console.log(table.toString());
    managerPrompt();
  });
};

function viewLowInventory () {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, result) {
    if (err) throw err;

    if (result.length === 0) {
      console.log("All inventory is sufficient.");

      managerPrompt();
    } else {
      var table = new Table({
        head: ["ID #", "Product", "Price", "Stock"],
        colWidths: [8, 30, 10, 10],
        chars: { "top": "═",
          "top-mid": "╤",
          "top-left": "╔",
          "top-right": "╗",
          "bottom": "═",
          "bottom-mid": "╧",
          "bottom-left": "╚",
          "bottom-right": "╝",
          "left": "║",
          "left-mid": "╟",
          "mid": "─",
          "mid-mid": "┼",
          "right": "║",
          "right-mid": "╢",
          "middle": "│" }
      });

      for (var i = 0; i < result.length; i++) {
        table.push([result[i].id, result[i].product_name, "$" + Number(result[i].price).toFixed(2), result[i].stock_quantity]);
      }

      console.log(table.toString());
      managerPrompt();
    }
  });
};

function addToInventory () {
  var allItems = [];

  connection.query("SELECT product_name FROM products", function (err, result) {
    if (err) throw err;

    for (var i = 0; i < result.length; i++) {
      allItems.push(result[i].product_name);
    }

    inquirer.prompt([
      {
        name: "item",
        type: "list",
        message: "Select the desired product.",
        choices: allItems
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to add to the existing inventory?",
        validate: function (value) {
          if (value % 1 === 0) {
            return true;
          }
          return "Enter a valid whole number";
        }
      }]).then(function (answer) {
      var itemID = allItems.indexOf(answer.item) + 1;

      updateInventoryNewAmount(itemID, answer.quantity);
    });
  });
};

function updateInventoryNewAmount (productID, addedAmount) {
  connection.query("UPDATE Products SET stock_quantity = (stock_quantity + ?) WHERE id = ?", [parseInt(addedAmount), productID], function (err, result) {
    if (err) throw err;

    console.log("The inventory has been updated.");
    managerPrompt();
  });
}

function addNewProduct () {
  inquirer.prompt([
    {
      name: "item",
      type: "text",
      message: "What is the product name?"
    },
    {
      name: "department",
      type: "text",
      message: "What is the name of the department this product belongs to?"
    },
    {
      name: "price",
      type: "input",
      message: "How much does this item cost?",
      validate: function (value) {
        value = parseInt(value) * 100;

        if (value % 1 === 0) {
          return true;
        }
        return "Enter a valid whole number";
      }
    },
    {
      name: "stock",
      type: "input",
      message: "How many items are in stock?",
      validate: function (value) {
        if (value % 1 === 0) {
          return true;
        }
        return "Enter a valid whole number";
      }
    }
  ]).then(function (user) {
    var itemObj = {
      product_name: user.item,
      department_name: user.department,
      price: user.price,
      stock_quantity: user.stock
    };

    updateInventoryNewProduct(itemObj);
  });
};

function updateInventoryNewProduct (productObj) {
  connection.query("INSERT INTO products SET ?", productObj, function (err, result) {
    if (err) throw err;

    console.log("The product list has been updated.");
    managerPrompt();
  });
};

connection.connect(function (err) {
  if (err) throw err;

  managerPrompt();
});
