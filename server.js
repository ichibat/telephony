const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const helmet = require('helmet');

// Load env vars
dotenv.config({ path: './config/config.env'});


// Connect to database
connectDB();

// Route files
const patients = require('./routes/patients');



const app = express();

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/patients', patients);


// Set security headers
app.use(helmet());


const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

//  Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
//  Close server & exit process
  server.close(() => process.exit(1));
});
