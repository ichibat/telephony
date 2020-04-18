const Patient = require('../models/Patient');


//  @desc   Get all patients
//  @route  Get /api/v1/patients
//  @access Public for now

exports.getPatients = async(req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ success: true, data: patients });
  } catch (err) {
    res.status(400).json({ success: false});
  }

}

//  @desc   Get single patients
//  @route  Get /api/v1/patients/:id
//  @access Public for now

exports.getPatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if(!patient) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: patient });
  } catch (err) {
    res.status(400).json({ success: false });
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
    res.status(400).json({
      success: false
    });
  }



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
