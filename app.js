// * Dependencies
const express = require('express');
const dotenv = require('dotenv');

// * Load Config
dotenv.config({ path: './config/config.env' });

// * Create the app object
const app = express();

// * Get the port from the config file
const PORT = process.env.PORT || 5000;

// * Init the server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
