const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Patient = require('../models/Patient');


//  @desc   Get reviews
//  @route  Get /api/v1/reviews
//  @route  Get /api/v1/patients/:patientId/reviews
//  @access Public

exports.getReviews = asyncHandler(async (req, res, next) => {
  if(req.params.patientId) {
    const reviews = await Review.find({patient: req.params.patientId});
    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});


//  @desc   Get single review
//  @route  Get /api/v1/reviews/:id
//  @access Public

exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'patient',
    select: 'karteNo, ptLastName, ptFirstName'
  });

  if (!review) {
    return next(new ErrorResponse(`ID:${req.params.id}のレビューはみつかりませんでした．`,404));
  }
  res.status(200).json({
    success: true,
    data: review})
});


//  @desc   Add review
//  @route  Get /api/v1/patient/:patientId/reviews
//  @access Private

exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.patient = req.params.patientId;
  req.body.user = req.user.id;
 
  const patient = await Patient.findById(req.params.patientId);

  if (!patient) {
    return next(new ErrorResponse(`ID:${req.params.patientId}の患者さんはみつかりませんでした．`),404
    )
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review})
});


//  @desc   Update review
//  @route  PUT /api/v1//reviews/:id
//  @access Private

exports.updateReview = asyncHandler(async (req, res, next) => {
  
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse(`ID:${req.params.id}のレビューはみつかりませんでした．`),404
    )
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`ID:${req.params.id}のレビューを変更する権限がありません．`),404)
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: review})
});

//  @desc   Delete review
//  @route  DELETE /api/v1//reviews/:id
//  @access Private

exports.deleteReview = asyncHandler(async (req, res, next) => {
  
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse(`ID:${req.params.id}のレビューはみつかりませんでした．`),404
    )
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`ID:${req.params.id}のレビューを変更する権限がありません．`),404)
  }

  await review.remove();

  res.status(200).json({
    success: true,
    data: {}})
});