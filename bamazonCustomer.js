var key = require("./keys.js");
var mysql = require("mysql");
var Table = require("cli-table");
var inquirer = require("inquirer");
var userCart = [];
var userTotalCost = 0;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: key.keySQL,
  database: "bamazon"
});

function displayMainTable () {
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
  });

  userSelectMultItems();
};

function userSelectMultItems () {
  var initialItems = [];

  connection.query("SELECT product_name, stock_quantity FROM products", function (err, result) {
    if (err) throw err;

    for (var i = 0; i < result.length; i++) {
      if (parseInt(result[i].stock_quantity) > 0) {
        initialItems.push(result[i].product_name);
      }
    }

    inquirer.prompt({
      name: "item",
      type: "checkbox",
      message: "Please select which items you want to add to your cart. (Press space to select)",
      choices: initialItems,
      validate: function (answer) {
        if (answer.length < 1) {
          return "You must choose at least one item.";
        }
        return true;
      }
    }).then(function (answer) {
      numberOfItems(answer.item);
    });
  });
};

function numberOfItems (userChoices) {
  var itemName = userChoices.shift();
  var itemStock;
  var itemCost;
  var itemId;

  connection.query("SELECT id, stock_quantity, price FROM products WHERE ?", {
    product_name: itemName
  }, function (err, result) {
    if (err) throw err;

    itemStock = result[0].stock_quantity;

    itemCost = result[0].price;

    itemId = result[0].id;
  });

  inquirer.prompt({
    name: "quantityItems",
    type: "text",
    message: "How many " + itemName + " would you like to add to your cart?",
    validate: function (answerText) {
      if (parseInt(answerText) <= itemStock) {
        return true;
      } else {
        console.log("\nInsufficient stock! We only have " + itemStock + " left in stock.");
        return false;
      }
    }
  }).then(function (results) {
    var quantity = results.quantityItems;

    userCart.push({
      id: itemId,
      name: itemName,
      cost: itemCost,
      stock: itemStock,
      quantity: quantity,
      newAmount: itemStock - quantity,
      total: itemCost * quantity
    });

    if (userChoices.length !== 0) {
      numberOfItems(userChoices);
    } else {
      checkout();
    }
  });
};

function checkout () {
  if (userCart.length !== 0) {
    for (var i = 0; i < userCart.length; i++) {
      userTotalCost += userCart[i].total;
    }

    displayReceipt();
    updateProductDatabase();
  }
};

function displayReceipt () {
  var table = new Table({
    head: ["Product", "Amount", "Price"],
    colWidths: [30, 10, 10]
  });

  for (var i = 0; i < userCart.length; i++) {
    table.push([userCart[i].name, userCart[i].quantity, "$" + Number(userCart[i].total).toFixed(2)]);
  }

  table.push(["", "Total:", "$" + userTotalCost.toFixed(2)]);

  console.log(table.toString());
};

function updateProductDatabase () {
  var item = userCart.shift();

  connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [item.newAmount, item.id], function (err, result) {
    if (err) throw err;

    if (userCart.length !== 0) {
      updateProductDatabase();
    } else {
      console.log("Thanks for shopping with us!");
    }
  });
};

connection.connect(function (err) {
  if (err) throw err;

  displayMainTable();
});
