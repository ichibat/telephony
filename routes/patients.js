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

const { protect } = require('../middleware/auth');



// Re-route into other resource routers
router.use('/:patientId/courses', courseRouter);

router.route('/:id/photo').put(protect, patientPhotoUpload);

router
  .route('/')
  .get(advancedResults(Patient, 'courses'), getPatients)
  .post(protect, createPatient);

router.route('/:id')
  .get(getPatient)
  .put(protect, updatePatient)
  .delete(protect, deletePatient);

module.exports = router;