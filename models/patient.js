const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  karteNo: {
    type: Number,
    required: [true, 'カルテ番号を入力してください．'],
    unique: true,
    maxlength: [5]
  }
  ptFirstName: {
    type: String,
    required: [true, '名前を入力してください．'],
    unique: false,
    trim: true,
    maxlength: [24, '名前が長すぎます．']
  },
  birthday: {
    type: Number,
    required: [true, '生年月日を19660221の形式で入力してください．'],
    maxlength: [8, '長すぎます．']
  },
  disease: {
    type: String,
    required: [true, '病名を入力してください．'],
    unique: false,
    trim: true,
    maxlength: [24, '病名が長すぎます．']
  }
})