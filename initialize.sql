DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INTEGER NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(7,2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (id)  
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Firebolt Broom", "Quality Quidditch Supplies", 3000, 10), ("Racing goggles", "Quality Quidditch Supplies", 199.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Knotgrass", "Apothecary", 5, 2000), ("Powdered bicorn horn", "Apothecary", 20, 1570), ("Bezoar", "Apothecary", 3, 270);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hogwards: A History", "Flourish and Blotts", 124.99, 150), ("Tom Riddle Diary", "Flourish and Blotts", 1999.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Trick Wands", "Weasleys' Wizard Wheezes", 2.75, 250), ("Ton-Tongue Toffee", "Weasleys' Wizard Wheezes", 11.49, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hand of Glory", "Borgin and Burkes", 5000, 1);

SELECT * FROM products;