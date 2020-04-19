const ErrorResponse = require('../utils/errorResponse');
const Patient = require('../models/Patient');


//  @desc   Get all patients
//  @route  Get /api/v1/patients
//  @access Public for now

exports.getPatients = async(req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ success: true, count: patients.length, data: patients });
  } catch (err) {
    // res.status(400).json({ success: false});
    next(err);
  }

}

//  @desc   Get single patients
//  @route  Get /api/v1/patients/:id
//  @access Public for now

exports.getPatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if(!patient) {
      // return res.status(400).json({ success: false });
      return next(new ErrorResponse(`idが${req.params.id}の患者さんをみつけることはできませんでした．`,404));
    }

    res.status(200).json({ success: true, data: patient });
  } catch (err) {
    // res.status(400).json({ success: false });
    // next(new ErrorResponse(`idが${req.params.id}の患者さんをみつけることはできませんでした．`,404));
    next(err);
  }
}

//  @desc   Create new patient
//  @route  Post /api/v1/patients
//  @access Private

exports.createPatient = async (req, res, next) => {
  try {
    const patient = await Patient.create(req.body);

    res.status(201).json({
      success: true,
      data: patient
    });
    
  } catch (err) {
    // res.status(400).json({
    //   success: false
    // });
    next(err);

  }



}

//  @desc   Update single patient
//  @route  PUT /api/v1/patients/:id
//  @access Private

exports.updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
      runValidataors: true
    });
    if(!patient) {
      return next(new ErrorResponse(`idが${req.params.id}の患者さんをみつけることはできませんでした．`,404));

    }
    res.status(200).json({ success: true, data: patient });
  } catch (err) {
    // res.status(400).json({
    //   success: false
    // });
    next(err);

  }
  };


//  @desc   Delete single patient
//  @route  DELETE /api/v1/patients/:id
//  @access Private

exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if(!patient) {
      return next(new ErrorResponse(`idが${req.params.id}の患者さんをみつけることはできませんでした．`,404));

    }
    res.status(200).json({ success: true, data: {patient} });
  } catch (err) {
    // res.status(400).json({
    //   success: false
    // });
    next(err);

  }
}
