// Import necessary modules
import { createClient } from 'redis'; // Redis client for data storage
import express from 'express'; // Express.js for creating the API
import bodyParser from 'body-parser'; // Middleware for parsing JSON requests
import { exec } from 'child_process'; // Import the exec function to run shell commands

// Create a Redis client
const client = createClient({
    url: 'redis://127.0.0.1:6380' // Configure the Redis client to connect to the Redis server at the specified URL
});

try {
    await client.connect(); // Attempt to connect to the Redis server

    await client.PING(); // Send a PING command to the Redis server 

    await client.disconnect(); // Disconnect from the Redis server when done

} catch (e) {
    
    if (e.code === 'ECONNREFUSED') {
        
        // If the connection to Redis is refused (Redis server not running), attempt to start the Redis server using a shell command
        var createserver = `sudo redis-server ./src/redis.conf`; // Define the shell command to start the Redis server

        exec(createserver, async (error, stdout, stderr) => {
            if (error) {
                // If there's an error while executing the command, log the command and error message 
                console.error(`Error executing command: ${error}`);
                console.error(stdout); 
                return;

            } else {

                await client.disconnect();

            }
        });



    } else {

        console.log(e); // Log other errors that may occur during Redis connection or disconnection
    }
}

// Create an Express application
const app = express();

// Define the port for the Express application
const port = 8100;

// Function to check if object keys match the required keys
function areKeysMatching(obj) {
    var requiredKeys = ['product', 'count', 'price'];

    var objectKeys = Object.keys(obj);

    return requiredKeys.every(key => objectKeys.includes(key));
}

// Use bodyParser middleware to parse JSON requests
app.use(bodyParser.json());

// Handle GET requests to the '/api' endpoint
app.get('/api', async (req, res) => {

    // Handle Redis client errors
    client.on('error', err => console.log('Redis Client Error', err));
    
    // Connect to the Redis server
    await client.connect();

    console.log("Accepted a GET request");

    // Retrieve a list of items from the Redis set 'inventory'
    let inventory = await client.sMembers('inventory');
    
    // If the inventory is empty, send a response
    if (inventory.length === 0) {

        res.send(`Inventory is empty \n`);

    } else {
        var txt = `INVENTORY : \n\n`;

        // Loop through each item in the inventory
        for (let i = 0; i < inventory.length; i++) {

            // Retrieve item details from a Redis hash
            let element = await client.hGetAll(inventory[i]);

            txt += (`${inventory[i]}: ${JSON.stringify(element, null, 2)} \n`);
        };

        // Send the response with inventory details
        res.send(txt);
    };

    // Disconnect from the Redis server
    await client.disconnect();
});

// Handle POST requests to the '/api' endpoint
app.post('/api', async (req, res) => {

    // Handle Redis client errors
    client.on('error', err => console.log('Redis Client Error', err));

    // Connect to the Redis server
    await client.connect();
    
    // Use config set to save data to a file 
    client.CONFIG_SET('appendonly', 'yes')

    console.log("Accepted a POST request with data:\n", req.body);

    // If the object keys match the required keys, update Redis data
    if (areKeysMatching(req.body)) {
        
        await client.sAdd('inventory', req.body['product']);

        await client.hSet(req.body['product'], {'count': req.body['count'], 'price': req.body['price'],});

        // Send a success response
        res.send(`${JSON.stringify(req.body)} was pushed correctly \n`);

    } else {
        
        // If object keys don't match, send an error response
        res.send(`${JSON.stringify(req.body)} was not pushed: error of keys \n`);
    };

    // Disconnect from the Redis server
    await client.disconnect();
});

// Start the Express application and listen on the specified port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
}); 
