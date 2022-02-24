const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  //name — имя пользователя, строка от 2 до 30 символов, обязательное поле;
  name:{
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  //about — информация о пользователе, строка от 2 до 30 символов, обязательное поле;
  about:{
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  //avatar — ссылка на аватарку, строка, обязательное поле.
  avatar:{
    type: String,
    required: true
  }
})

// создаём модель user и экспортируем её
module.exports = mongoose.model('user', userSchema);