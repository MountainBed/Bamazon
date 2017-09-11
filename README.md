# Bamazon
An Amazon-like storefront using MySQL and node.js. This contains both a customer Interface, as well as a Manager interface.  

## Features  
### Customer Interface  
1. Allow the customer to select which items they would like to add to their cart. Multiple items can be added at once.  
2. Once the item(s) is/are selected, the customer will then determine how much of each item they want.

### Manager Interface  
1. Allow the manager to view the products that are currently being sold.  
2. Allow the manager to view the products that have less than 5 in stock.  
3. Allow the manager to add to the stock of any products that are currently being sold.  
4. Allow the manager to add a new product to be sold. This update requires a product name, department name, price per individual item, and how many will be in stock.

## How to Use  

1. Run "npm install" in the directory you are going to be working from. This will ensure the app runs correctly.

### Optional Database Setup
1. Use schema.sql to create a database named bamazon, as well as a table named products.  
 
2. Use data.sql to create some psuedo data for the purposes of this demonstration that will populate the products table created in the previous step.  

### Customer Interface  
1. To start the customer interface, use the command "node bamazonCustomer.js" in the command line.  
![start](https://i.imgur.com/6ykLMDl.png)  
2. Next, the select the product(s) you would like to add to your cart by using the arrow keys to highlight the item and the space bar to select it. Press enter to move to the next step.  
![select](https://i.imgur.com/Gv5qkG2.png)  
3. Next, provide the number of each product you would like to add to your cart. Press enter to move to the next step. If you are trying to purchase more items than are in stock, you will be notified and asked to change the desired amount.  
![quantity](https://i.imgur.com/xybijZ6.png)  
4. The app will then provide you with a receipt, broken down by product, as well as the toatl cost of each item adn the total cost of the purchase.  
![final](https://i.imgur.com/IFHImXZ.png)