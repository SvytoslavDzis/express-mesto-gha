const User = require('../models/user')
// Обработка ошибок в асинхронном коде. Async/await
exports.getUsers = async (req, res) => {
  try {
    // Метод find возвращает все документы по запросу
    const CODE_OK_200 = 200;
    const users = await User.find({})
    return res.status(CODE_OK_200).send(users);
  }catch(err){
    const ERROR_CODE_500 = 500;
    return res.status(ERROR_CODE_500).send('Ошибка по умолчанию.');
  }
}

exports.getUserById = async(req, res) =>{
  try{
    const CODE_OK_200 = 200;
    const ERROR_CODE_404 = 404;
    // Метод findById возвращает документы найденные по id
    const user = await User.findById(req.params.userId)
    if(user){
      return res.status(CODE_OK_200).send(user);
    }else{
      return res.status(ERROR_CODE_404).send({message: 'Пользователь по указанному _id не найден.'});
    }
  }catch(err){
    const ERROR_CODE_400 = 400;
    const ERROR_CODE_500 = 500;
    if (err.name === 'CastError') {
      return res.status(ERROR_CODE_400).send({message: 'Некорректно переданы данные пользователя'})
    } else {
      return res.status(ERROR_CODE_500).send('Ошибка по умолчанию.');
    }
  }
}

exports.createUser = async (req, res) => {
  try {
    const CODE_OK_201 = 201;
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    if (user) {
      res.status(CODE_OK_201).send(user);
    }
  }catch(err){
    const ERROR_CODE_400 = 400;
    const ERROR_CODE_500 = 500;
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE_400).send({message: 'Переданы некорректные данные при создании пользователя.'})
    } else {
      return res.status(ERROR_CODE_500).send({message: 'Ошибка по умолчанию.'})
    }
  }
}

exports.updateUser  = async (req, res) => {
  try {
    const CODE_OK_200 = 200;
    const ERROR_CODE_404 = 404;
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    if (user) {
      return res.status(CODE_OK_200).send(user);
    }else{
      return res.status(ERROR_CODE_404).send({message: 'Пользователь с указанным _id не найден.'});
    }
  }catch(err){
    const ERROR_CODE_400 = 400;
    const ERROR_CODE_500 = 500;
    if(err.name === 'ValidationError') {
      return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
    } else {
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка по умолчанию.' });
    }
  }
}

exports.updateUserAvatar  = async (req, res) => {
  try {
    const CODE_OK_200 = 200;
    const ERROR_CODE_404 = 404;
    const { avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    if (updatedUser) {
      return res.status(CODE_OK_200).send(updatedUser);
    }else{
      return res.status(ERROR_CODE_404).send({message: 'Пользователь с указанным _id не найден.'});
    }
  }catch(err){
    const ERROR_CODE_400 = 400;
    const ERROR_CODE_500 = 500;
    if(err.name === 'ValidationError') {
      return res.status(ERROR_CODE_400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
    } else {
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка по умолчанию.' });
    }
  }
}