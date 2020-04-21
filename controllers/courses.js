const ErrorResponse = require('../utils/errorResponse');
const Course = require('../models/Course');
const Patient = require('../models/Patient');
const asyncHandler = require('../middleware/async');

//  @desc   Get courses
//  @route  Get /api/v1/courses
//  @route  Get /api/v1/patients/:patientId/courses
//  @access Public for now

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if(req.params.patientId) {
    query = Course.find({patient: req.params.patientId});
  } else {
    query = Course.find().populate({
      path: 'patient',
      select: 'karteNo ptLastName ptFirstName'
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    datå: courses
  });
})

//  @desc   Get single courses
//  @route  Get /api/v1/courses/:id
//  @access Public for now

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'patient',
    select: 'karteNo PtLastName PtFirstName'
  });

  if(!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`),
    404
    );
  }

  res.status(200).json({
    success: true,
    datå: course
  });
})

//  @desc   Add a course
//  @route  POST /api/v1/patient/:id/courses
//  @access Private

exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.patient = req.params.patientId;

  const patient = await Patient.findById(req.params.patientId);

  if(!patient) {
    return next(new ErrorResponse(`No patient with the id of ${req.params.patientId}`),
    404
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    datå: course
  });
})


//  @desc   UPDATE a course
//  @route  PUT /api/v1/courses/:id
//  @access Private

exports.updateCourse = asyncHandler(async (req, res, next) => {

  let course = await Course.findById(req.params.id);

  if(!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`),
    404
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    datå: course
  });
})