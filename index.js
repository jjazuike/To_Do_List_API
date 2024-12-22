// import required librarie
const express = require('express'); // for building the server
const cors = require('cors'); // for handling cross-origin requests
const sqlite3 = require('sqlite3').verbose(); // for SQLite databas

// initialize the server and make it listen to incoming requests
const app = express(); // INitialize the express app
const port = 3000; // Define the port number

// Middleware
app.use(cors()); // enable CORS
app.use(express.json()); //Parse JSON data from requests

// Start the server
app.listen(port, () =>{
    console.log('Server running at http://localhost:$(port)');
});

console.log(`Hello`);
