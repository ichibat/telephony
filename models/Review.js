const mongoose = require('mongoose');


const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    requiered: [true, 'レビューへのタイトルをつけて下さい．'],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, 'レビューを書いてください．']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'クリニックの点数を1から10でつけて下さい．']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Prevent user from submitting more than on review per patient
ReviewSchema.index({ patient: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (patientId) {
  
  const obj = await this.aggregate([
    {
      $match: { patient: patientId }
    },
    {
      $group: {
        _id: '$patient',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);
  try {
    await this.model('Patient').findByIdAndUpdate(patientId, {
      averageRating: obj[0].averageRating
    });
  } catch (err) {
    console.error(err);
  }
};

// call getAverageRating after save
  ReviewSchema.post('save', function () {
    this.constructor.getAverageRating(this.patient);
  });

// call getAverageRating before remove
  ReviewSchema.pre('remove', function () {
  this.constructor.getAverageRating(this.patient);
  });

module.exports = mongoose.model('Review', ReviewSchema);