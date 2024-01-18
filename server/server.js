// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const { initializeMasterDatabase, initializeSlaveDatabase } = require('./db');
const fs = require('fs')
require('dotenv').config();


// Import routes

// Set default port for express app
const PORT = process.env.PORT || 4001;

// Create express app
const app = express();

let myGlobalVariable = null;

function setMyGlobalVariable(value) {
  myGlobalVariable = value;
}

function getMyGlobalVariable() {
  return myGlobalVariable;
}

module.exports = {
  setMyGlobalVariable,
  getMyGlobalVariable,
};


// Initialize MASTER database
initializeMasterDatabase();
// const dbName = process.env.DB_NAME;
// if (dbName !== null) {
//   initializeSlaveDatabase(dbName);
// } else {
//   initializeSlaveDatabase("slave");
// }
initializeSlaveDatabase("slave");

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '35mb'}));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '35mb',
    parameterLimit: 50000,
  }),
);
//config routes
const IndexRouter = require('./routes/index');

IndexRouter.configRoute(app);

//handle error
app.use((err, req, res, next) => {
  console.log(err, res);
  next(err);
});

// Start express app
app.listen(PORT, function () {
  console.log(`Server is running on: ${PORT}`);
});
