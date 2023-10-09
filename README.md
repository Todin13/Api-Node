# Node.js Redis API
This is a Node.js application that serves as a simple API for managing inventory data using Redis as the data store. It provides endpoints for retrieving and updating inventory information.

## Prerequisites
Before running this application, you need to have the following software installed:

Node.js: The JavaScript runtime for executing the application. \
Redis: A fast, open-source, in-memory key-value data store. \

And either have a linux OS like ubuntu or a bash terminal

## Installation and Setup
Clone this repository to your local machine.\
And run requirement.sh after you made it executable.\
The required Node.js modules are already in the directory.\
During the installation it may ask your password for sudo same during the start of the index.js

## Starting the API
To start the API you have to be inside the bash terminal inside the repository were you cloned Api-Node. Next you write this in you terminal :

	node ./Api-Node/src/index.js

 You may have to put your passwword for sudo.

## API Endpoints
### GET /api
This endpoint retrieves a list of items from the Redis set named 'inventory'. It returns a JSON response with the inventory details, including product names, counts, and prices.

Example Request:

	curl -X GET http://localhost:8100

Attention the request musst be send from another terminal than the one were the app is running.\

Example Response:

	{
  		"inventory": [
  		{
		  "product": "Product1",
		  "count": "10",
		  "price": "50.00"
		},
		{
      		  "product": "Product2",
      		  "count": "5",
  		  "price": "25.00"
		}]
	}
	
	
### POST /api
This endpoint allows you to add new items to the inventory. You need to send a JSON request body with the following keys: 'product', 'count', and 'price'. If the keys match the required keys, the data will be pushed to Redis, and a success response will be returned. If the keys do not match, an error response will be sent.

Example Request:

	curl -H "Content-Type: application/json" -X POST -d '{"product":"disk", "count":5, "price": 20}' http://localhost:8100/api

Attention the request musst be send from another terminal than the one were the app is running.\
 
Example Success Response:

	{
	  {"product":"disk","count":5,"price":20} was pushed correctly 
	}
	

### Error Handling
The application handles errors related to the Redis client and responds appropriately. If Redis is not running, the application attempts to start it using a shell command.

## Configuration
You can configure the Redis connection URL and other settings in the code to match your environment. Additionally, the Redis data persistence settings are configured to append data to a file using CONFIG_SET('appendonly', 'yes'). You can customize this further as needed.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Author
Todin13
