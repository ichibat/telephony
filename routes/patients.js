const express = require('express');
const router = express.Router();

//get all patients
router.get('/',(req, res) => {
  res.status(200).json({ success: true, msg: "show!"});
});

//get specific patients
router.get('/:id',(req, res) => {
  res.status(200).json({ success: true, msg: `Show patient ${req.params.id}`});
});

//create new patients
router.post('/',(req, res) => {
  res.status(200).json({ success: true, msg: "Create new patient"});
});

//update patients
router.put('/:id',(req, res) => {
  res.status(200).json({ success: true, msg: `Update patient ${req.params.id}`});
});

//delete patients
router.delete('/:id',(req, res) => {
  res.status(200).json({ success: true, msg: `Delete patient ${req.params.id}`});
});

module.exports = router;