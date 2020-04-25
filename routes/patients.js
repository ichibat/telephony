const express = require('express');
const { 
  getPatients, 
  getPatient, 
  createPatient, 
  updatePatient, 
  deletePatient,
  patientPhotoUpload
} = require('../controllers/patients');

const Patient = require('../models/Patient');
const advancedResults = require('../middleware/advancedResults');


// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router(); 

// Re-route into other resource routers
router.use('/:patientId/courses', courseRouter);

router.route('/:id/photo').put(patientPhotoUpload);

router
  .route('/')
  .get(advancedResults(Patient, 'courses'), getPatients)
  .post(createPatient);

router.route('/:id')
  .get(getPatient)
  .put(updatePatient)
  .delete(deletePatient);

module.exports = router;