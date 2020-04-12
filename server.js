const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');

// Route files
const patients = require('./routes/patients');


dotenv.config({ path: './config/config.env'});

const app = express();

// Mount routers
app.use('/api/v1/patients', patients);


// Set security headers
app.use(helmet());


const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
