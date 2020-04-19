const ErrorResponse = require('../utils/errorResponse');
const Patient = require('../models/Patient');
const asyncHandler = require('../middleware/async');


//  @desc   Get all patients
//  @route  Get /api/v1/patients
//  @access Public for now

exports.getPatients = asyncHandler(async(req, res, next) => {
    let query;
     
    let queryStr = JSON.stringify(req.query);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Patient.find(JSON.parse(queryStr));
    
    const patients = await query;

    res.status(200).json({ success: true, count: patients.length, data: patients });

    console.log(queryStr);
  
  });



//  @desc   Get single patients
//  @route  Get /api/v1/patients/:id
//  @access Public for now

exports.getPatient = asyncHandler(async (req, res, next) => {
  
    const patient = await Patient.findById(req.params.id);

    if(!patient) {
      return next(new ErrorResponse(`idが${req.params.id}の患者さんをみつけることはできませんでした．`,404));
    }

    res.status(200).json({ success: true, data: patient });
  });


//  @desc   Create new patient
//  @route  Post /api/v1/patients
//  @access Private

exports.createPatient = asyncHandler(async (req, res, next) => {

    const patient = await Patient.create(req.body);

    res.status(201).json({success: true, data: patient});
  });

//  @desc   Update single patient
//  @route  PUT /api/v1/patients/:id
//  @access Private

exports.updatePatient = asyncHandler(async (req, res, next) => {

    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
      runValidataors: true
    });
    if(!patient) {
      return next(new ErrorResponse(`idが${req.params.id}の患者さんをみつけることはできませんでした．`,404));

    }
    res.status(200).json({ success: true, data: patient });
  });


//  @desc   Delete single patient
//  @route  DELETE /api/v1/patients/:id
//  @access Private

exports.deletePatient = asyncHandler(async (req, res, next) => {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if(!patient) {
      return next(new ErrorResponse(`idが${req.params.id}の患者さんをみつけることはできませんでした．`,404));

    }
    res.status(200).json({ success: true, data: {patient} });
  
});
