const express = require('express');
const { 
  getPatients, 
  getPatient, 
  createPatient, 
  updatePatient, 
  deletePatient
} = require('../controllers/patients');


// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router(); 

// Re-route into other resource routers
router.use('/:patientId/courses', courseRouter);

router
  .route('/')
  .get(getPatients)
  .post(createPatient);

router.route('/:id')
  .get(getPatient)
  .put(updatePatient)
  .delete(deletePatient);

module.exports = router;