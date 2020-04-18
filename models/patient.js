const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  karteNo: {
    type: Number,
    required: [true, 'カルテ番号を入力してください．'],
    unique: true,
    maxlength: [5]
  },
  ptLastName: {
    type: String,
    required: [true, '名字（姓）を入力してください．'],
    unique: false,
    trim: true,
    maxlength: [12, '名字が長すぎます．']
  },
  ptFirstName: {
    type: String,
    required: [true, '名前（名）を入力してください．'],
    unique: false,
    trim: true,
    maxlength: [12, '名前が長すぎます．']
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
  },
  address: {
    type: String,
    required: [true, '住所を入力してください．'],
    unique: false,
    trim: true,
    maxlength: [100, '住所が長すぎます．']
  },
  telephone: {
    type: Number,
    required: [true, '電話番号をハイフン無しで入力してください．'],
    maxlength: [11, '長すぎます．']
  },
  diseaseHistory: {
    type: String,
    required: [true, '病歴を入力してください．ない場合は，なしと入力してください．'],
    unique: false,
    trim: true,
    maxlength: [300, '病歴が長すぎます．']
  },
  primaryDr: {
    type: String,
    required: [true, '主治医名を入力してください．'],
    unique: false,
    trim: true,
    maxlength: [24, '名前が長すぎます．']
  },
  primaryCM: {
    type: String,
    required: [true, 'ケアマネージャー名を入力してください．'],
    unique: false,
    trim: true,
    maxlength: [24, '名前が長すぎます．']
  },
  primaryNs: {
    type: String,
    required: [true, '訪問看護ステーションを入力してください．ない場合は,なしと入力してください．'],
    unique: false,
    trim: true,
    maxlength: [50, '名前が長すぎます．']
  },
  primaryPh: {
    type: String,
    required: [true, '訪問看護ステーションを入力してください．ない場合は,なしと入力してください．'],
    unique: false,
    trim: true,
    maxlength: [50, '名前が長すぎます．']
  },
  createdAt: {
    type: Date,
    dafault: Date.now
  }
})