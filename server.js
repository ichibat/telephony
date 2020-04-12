const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config({ path: './config/config.env'});

const app = express();


// Set security headers
app.use(helmet());

//get all patients
app.get('/api/v1/patients',(req, res) => {
  res.status(200).json({ success: true, msg: "show!"});
});

//get specific patients
app.get('/api/v1/patients/:id',(req, res) => {
  res.status(200).json({ success: true, msg: `Show patient ${req.params.id}`});
});

//create new patients
app.post('/api/v1/patients',(req, res) => {
  res.status(200).json({ success: true, msg: "Create new patient"});
});

//update patients
app.put('/api/v1/patients/:id',(req, res) => {
  res.status(200).json({ success: true, msg: `Update patient ${req.params.id}`});
});

//delete patients
app.delete('/api/v1/patients/:id',(req, res) => {
  res.status(200).json({ success: true, msg: `Delete patient ${req.params.id}`});
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
