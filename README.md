# Node.js Redis API
This is a Node.js application that serves as a simple API for managing inventory data using Redis as the data store. It provides endpoints for retrieving and updating inventory information.

## Prerequisites
Before running this application, you need to have the following software installed:

Node.js: The JavaScript runtime for executing the application. \n
Redis: A fast, open-source, in-memory key-value data store.

## Installation and Setup
Clone this repository to your local machine.
\n
And run requirement.sh after you made it executable.
\n
The required Node.js modules are already in the directory

## API Endpoints
### GET /api
This endpoint retrieves a list of items from the Redis set named 'inventory'. It returns a JSON response with the inventory details, including product names, counts, and prices.

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

	{
	  "product": "NewProduct",
	  "count": "8",
	  "price": "35.00"
	}
	
Example Success Response:

	{
	  "message": "NewProduct was pushed correctly"
	}
	
Example Error Response:

	{
	  "error": "Invalid data format: Missing 'product', 'count', or 'price' key"
	}

### Error Handling
The application handles errors related to the Redis client and responds appropriately. If Redis is not running, the application attempts to start it using a shell command.

## Configuration
You can configure the Redis connection URL and other settings in the code to match your environment. Additionally, the Redis data persistence settings are configured to append data to a file using CONFIG_SET('appendonly', 'yes'). You can customize this further as needed.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Author
Todin13
