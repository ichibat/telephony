const patient = require('../models/Patient');


//  @desc   Get all patients
//  @route  Get /api/v1/patients
//  @access Public for now

exports.getPatients = (req, res, next) => {
  res.status(200).json({ success: true, msg: "show all patients" });
}

//  @desc   Get single patients
//  @route  Get /api/v1/patients/:id
//  @access Public for now

exports.getPatient = (req, res, next) => {
  res
  .status(200)
  .json({ success: true, msg: `Show patient ${req.params.id}`});

}

//  @desc   Create new patient
//  @route  Post /api/v1/patients
//  @access Private

exports.createPatient = (req, res, next) => {
  console.log(req.body);
  res
  .status(200)
  .json({ success: true, msg: "Create new patient"});
}

//  @desc   Update single patient
//  @route  PUT /api/v1/patients/:id
//  @access Private

exports.updatePatient = (req, res, next) => {
  res
  .status(200)
  .json({ success: true, msg: `Update patient ${req.params.id}`});
}

//  @desc   Delete single patient
//  @route  DELETE /api/v1/patients/:id
//  @access Private

exports.deletePatient = (req, res, next) => {
  res
  .status(200)
  .json({ success: true, msg: `Delete patient ${req.params.id}`});
}
