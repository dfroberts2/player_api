const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/**
 * Database
 */
require('./config/database');

/**
 * Body Parsing
 */
app.use(bodyParser.json());

/**
 * Routes
 */
require('./routes')(app);



const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

module.exports = app;