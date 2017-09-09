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

SELECT * FROM products;