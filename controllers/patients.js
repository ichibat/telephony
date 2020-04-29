const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const Patient = require('../models/Patient');
const asyncHandler = require('../middleware/async');


//  @desc   Get all patients
//  @route  Get /api/v1/patients
//  @access Public for now

exports.getPatients = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults);
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
  // Add user to req.body
    req.body.user = req.user.id;

  // Check for published patient
    const publishedpatient = await Patient.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one patient
    if(publishedpatient && req.user.role !== 'admin') {
      return next(new ErrorResponse(`このユーザーID:${req.user.id}はすでに患者さんを登録しています．`, 400));
    }

    const patient = await Patient.create(req.body);

    res.status(201).json({success: true, data: patient});
  });

//  @desc   Update single patient
//  @route  PUT /api/v1/patients/:id
//  @access Private

exports.updatePatient = asyncHandler(async (req, res, next) => {

   let patient = await Patient.findById(req.params.id);
    if(!patient) {
      return next(new ErrorResponse(`idが${req.params.id}の患者さんをみつけることはできませんでした．`,404));

    }

// Make sure that user is a patient doctor

    if(patient.user.toString() !== req.user.id && req.user.role !=='admin') {
      return next(new ErrorResponse(`ユーザーIDが${req.params.id}の方はこのデータを変更できません．`,401));
    }

    patient = await Patient.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

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

    // Make sure that user is a patient doctor

    if(patient.user.toString() !== req.user.id && req.user.role !=='admin') {
      return next(new ErrorResponse(`ユーザーIDが${req.params.id}の方はこのデータを削除できません．`,401));
    }

    patient.remove();

    res.status(200).json({ success: true, data: {} });
  
});


//  @desc   Upload photo for patient
//  @route  PUT /api/v1/patients/:id/photo
//  @access Private

exports.patientPhotoUpload = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);

  if(!patient) {
    return next(new ErrorResponse(`idが${req.params.id}の患者さんをみつけることはできませんでした．`,404));

  }

  // Make sure that user is a patient doctor

  if(patient.user.toString() !== req.user.id && req.user.role !=='admin') {
    return next(new ErrorResponse(`ユーザーIDが${req.params.id}の方はこのデータを変更できません．`,401));
  }

  if(!req.files) {
    return next(new ErrorResponse(`ファイルをアップロードして下さい．`,400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if(!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`画像の形式のファイルをアップロードして下さい．`,400));
  } 

  // Check filesize
  if(file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`ファイルサイズが${process.env.MAX_FILE_UPLOAD}以下のファイルをアップロードして下さい．`,400));
  }

  // Create custom filename
  file.name = `photo_${patient._id}${path.parse(file.name).ext} `;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if(err) {
      console.error(err);
      return next(new ErrorResponse(`ファイルのアップロードエラーです．`,500));
    }

    await Patient.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });

  });
});
