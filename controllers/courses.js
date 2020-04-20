const ErrorResponse = require('../utils/errorResponse');
const Course = require('../models/Course');
const asyncHandler = require('../middleware/async');

//  @desc   Get courses
//  @route  Get /api/v1/courses
//  @route  Get /api/v1/patients/:patientId/courses
//  @access Public for now

exports.getCourses = asyncHandler(async (req, res,next) => {
  let query;

  if(req.params.patientId) {
    query = Course.find({patient: req.params.patientId});
  } else {
    query = Course.find();
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    datå: courses
  });
})