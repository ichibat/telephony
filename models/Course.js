const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({
  currentFluHistory: {
    type: String,
    required: [true, '病歴を入力してください．不明の場合は，なしと入力してください．'],
    unique: false,
    trim: true,
    maxlength: [300, '病歴が長すぎます．']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  patient: {

  }
})



module.exports = mongoose.model('Course', CourseSchema);