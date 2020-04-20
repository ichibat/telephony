const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({

  severityAtFirst: {
    type: String,
    required: [true, '発症時の重症度を入力してください．'],
    enum: ['軽症','中等症','重症','不明']
  },
  currentFluHistory: {
    type: String,
    required: [true, '今回の風邪症状の病歴を入力してください．不明の場合は，なしと入力してください．'],
    unique: false,
    trim: true,
    maxlength: [300, '病歴が長すぎます．']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: true
  }
})


module.exports = mongoose.model('Course', CourseSchema);