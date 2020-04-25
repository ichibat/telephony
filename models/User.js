const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '名前を入力してください．名字と名前の間にはスペースをあけて下さい．']
  },
  email: {
    type: String,
    required: [true, 'Eメールアドレスを入力してくだい'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      '正しいEメールアドレスを入力して下さい．'
    ]
  },
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'パスワードを入力して下さい．'],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);