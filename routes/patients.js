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


// Include other resource routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

const router = express.Router(); 


const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');



// Re-route into other resource routers
router.use('/:patientId/courses', courseRouter);
router.use('/:patientId/reviews', reviewRouter);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), patientPhotoUpload);

router
  .route('/')
  .get(advancedResults(Patient, 'courses'), getPatients)
  .post(protect, authorize('publisher', 'admin'), createPatient);

router.route('/:id')
  .get(getPatient)
  .put(protect, authorize('publisher', 'admin'), updatePatient)
  .delete(protect, authorize('publisher', 'admin'), deletePatient);

module.exports = router;