const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Patient = require('../models/Patient');


//  @desc   Get courses
//  @route  Get /api/v1/courses
//  @route  Get /api/v1/patients/:patientId/courses
//  @access Public for now

exports.getCourses = asyncHandler(async (req, res, next) => {
  if(req.params.patientId) {
    const courses = await Course.find({patient: req.params.patientId});
    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

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
  req.body.user = req.user.id;

  const patient = await Patient.findById(req.params.patientId);

  if(!patient) {
    return next(new ErrorResponse(`No patient with the id of ${req.params.patientId}`),
    404
    );
  }

  // Make sure that user is a patient doctor

  if(patient.user.toString() !== req.user.id && req.user.role !=='admin') {
    return next(new ErrorResponse(`ユーザーID:${req.user.id}の方は患者ID:${patient._id}のデータを変更できません．`,401));
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

  // Make sure that user is a course owner

  if(course.user.toString() !== req.user.id && req.user.role !=='admin') {
    return next(new ErrorResponse(`ユーザーID:${req.user.id}の方はコースID:${course._id}のデータを変更できません．`,401));
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

//  @desc   DELETE a course
//  @route  DELETE /api/v1/courses/:id
//  @access Private

exports.deleteCourse = asyncHandler(async (req, res, next) => {

  const course = await Course.findById(req.params.id);

  if(!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`),
    404
    );
  }

    // Make sure that user is a course owner

    if(course.user.toString() !== req.user.id && req.user.role !=='admin') {
      return next(new ErrorResponse(`ユーザーID:${req.user.id}の方はコースID:${course._id}のデータを削除できません．`,401));
    }
  
  await course.remove();

  res.status(200).json({
    success: true,
    datå: {}
  });
})