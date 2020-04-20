const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({

  severity: {
    type: String,
    required: [true, '発症時の重症度を入力してください．'],
    enum: ['軽症','中等症','重症','不明']
  },
  auditAt: {
    type: Date,
    min: '2019-01-01',
    max: '2029-01-01'
  },
  testedAt: {
    type: Date,
    min: '2019-01-01',
    max: '2029-01-01'
  },
  currentFluHistory: {
    type: String,
    required: [true, '今回の風邪症状の病歴を入力してください．不明の場合は，なしと入力してください．'],
    unique: false,
    trim: true,
    maxlength: [300, '病歴が長すぎます．']
  },
  hospitalization: {
    type: Boolean,
    required: [false, '経過中入院したかを入力してください．']
  },
  outcome: {
    type: String,
    required: [true, '症例の転帰を入力してください．'],
    enum: ['生存','死亡','不明']
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