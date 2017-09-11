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
2. Next, the select the product(s) you would like to add to your cart by using the arrow keys to highlight the item and the spacebar to select it. Press enter to move to the next step.  
![select](https://i.imgur.com/Gv5qkG2.png)  
3. Next, provide the number of each product you would like to add to your cart. Press enter to move to the next step. If you are trying to purchase more items than are in stock, you will be notified and asked to change the desired amount.  
![quantity](https://i.imgur.com/xybijZ6.png)  
4. The app will then provide you with a receipt, broken down by product, as well as the total cost of each item and the total cost of the purchase.  
![final](https://i.imgur.com/IFHImXZ.png)  

### Manager Interface  
1. To start the manager interface, use the command "node bamazonManager.js" in the command line.  
2. Select which action you would like to complete. 
![start](https://i.imgur.com/4fHs5Uf.png)  
#### View Products for Sale  
This command will provide a table of the products that are currently for sale. After this is displayed, you will be shown the original command list.  
![view products](https://i.imgur.com/Jqsp7Dz.png)  
#### View Low Inventory  
This command will provide a table of the products that have less than 5 in stock. After this is displayed, you will be shown the original command list.  
![low inventory](https://i.imgur.com/fjkiSQ9.png)  
#### Add to Inventory  
1.  This command will produce a list of the items that are currently in stock. Select which item you want to add inventory to.  
![add inventory](https://i.imgur.com/Ycq2mMc.png)  
2. Next, determine how much more stock you would like to add for the selected product. Once this has been completed, you will be notified that the inventory has been updated and the original command list will be displayed again.  
![quantity of new product](https://i.imgur.com/BGrMkIM.png)  
#### Add New Product  
1. This command will give you the ability to add a new product for sale. To do this, the following information is required:  
  * Product name  
  * Department name  
  * Cost of the item  
  * Stock of the item  
![add product](https://i.imgur.com/jlHkDqr.png)
2. The item will then be added to the database and the original command list will be displayed again.  
![added product](https://i.imgur.com/G6AZQnk.png)
#### Exit
This command will end your interaction with the application.  

### Copyright
  &copy; 2017 Ross Blair