const mongoose = require('mongoose');
const slugify = require('slugify');


const PatientSchema = new mongoose.Schema({
  primaryDr: {
    type: String,
    required: [true, '主治医名を入力してください．不明，未定の場合は，なしと入力してください．'],
    unique: false,
    trim: true,
    maxlength: [24, '名前が長すぎます．']
  },
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
    required: [true, '生年月日を19660221の形式で入力してください．不明の場合は，なしと入力してください．'],
    maxlength: [8, '長すぎます．']
  },
  telephone: {
    type: Number,
    required: [true, '電話番号をハイフン無しで入力してください．不明の場合は，なしと入力してください．'],
    maxlength: [11, '長すぎます．']
  },
  address: {
    type: String,
    required: [true, '住所を入力してください．不明の場合は，なしと入力してください．'],
    unique: false,
    trim: true,
    maxlength: [100, '住所が長すぎます．']
  },
  disease: {
    type: String,
    required: [true, '病名を入力してください．不明の場合は，なしと入力してください．'],
    unique: false,
    trim: true,
    maxlength: [24, '病名が長すぎます．']
  },
  diseaseHistory: {
    type: String,
    required: [true, '病歴を入力してください．不明の場合は，なしと入力してください．'],
    unique: false,
    trim: true,
    maxlength: [300, '病歴が長すぎます．']
  },
  slug: String,
  description: {
    type: String,
    required: [false, 'Please add a description'],
    maxlength: [500, 'Descrption can not be more than 500 characters']
  },
  primaryCM: {
    type: String,
    required: [true, 'ケアマネージャー名を入力してください．不明，未定の場合は，なしと入力してください．'],
    unique: false,
    trim: true,
    maxlength: [24, '名前が長すぎます．']
  },
  primaryNs: {
    type: String,
    required: [true, '訪問看護ステーションを入力してください．不明，未定の場合は，なしと入力してください．'],
    unique: false,
    trim: true,
    maxlength: [50, '名前が長すぎます．']
  },
  primaryPh: {
    type: String,
    required: [true, '薬局を入力してください．不明，未定の場合は，なしと入力してください．'],
    unique: false,
    trim: true,
    maxlength: [50, '名前が長すぎます．']
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Create patient slug from the name
PatientSchema.pre('save', function(next) {
  this.slug = slugify(this.ptLastName, { lower: true});
  next();
});


// Cascade delete courses when a patient is deleted
PatientSchema.pre('remove', async function (next) {
  console.log("Courses being removed from this patient");
  await this.model('Course').deleteMany({ patient: this._id });
  next();
})


// Reverse populate with virtuals
PatientSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'patient',
  justOne: false
});


module.exports = mongoose.model('Patient', PatientSchema);