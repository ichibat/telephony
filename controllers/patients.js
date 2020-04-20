const ErrorResponse = require('../utils/errorResponse');
const Patient = require('../models/Patient');
const asyncHandler = require('../middleware/async');


//  @desc   Get all patients
//  @route  Get /api/v1/patients
//  @access Public for now

exports.getPatients = asyncHandler(async(req, res, next) => {
    let query;
    
    // Copy req.query
    const reqQuery = {...req.query};

    // Fields to exclude
    const removeFields = ['select', 'sort','page','limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resourse
    query = Patient.find(JSON.parse(queryStr)).populate('courses');

    // Select Fields
    if(req.query.select) {
      const fields = req.query.select.split(',').join(' '); 
      query = query.select(fields);
    }

    // Sort Fields
    if(req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' '); 
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10)　|| 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Patient.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const patients = await query;

    // Pagination result
    const pagination = {};

    if(endIndex < total) {
      pagination.next = {
        page: page + 1, 
        limit
      }
    }

    if(startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      }
    }

    res.status(200).json({ success: true, count: patients.length, pagination, data: patients });

  
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
    const patient = await Patient.findById(req.params.id);
    if(!patient) {
      return next(new ErrorResponse(`idが${req.params.id}の患者さんをみつけることはできませんでした．`,404));

    }

    patient.remove();

    res.status(200).json({ success: true, data: {} });
  
});
