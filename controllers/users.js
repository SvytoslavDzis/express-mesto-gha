const User = require('../models/user')
// Обработка ошибок в асинхронном коде. Async/await
exports.getUsers = async (req, res) => {
  try {
    // Метод find возвращает все документы по запросу
    const users = await User.find({})
    res.status(200).send(users);
  }catch(err){
    res.status(500).send('Ошибка по умолчанию.');
  }
}

exports.getUserById = async(req, res) =>{
  try{
    // Метод findById возвращает документы найденные по id
    const user = await User.findById(req.params.userId)
    if(user){
      res.status(200).send(user);
    }else{
      res.status(404).send({message: 'Пользователь по указанному _id не найден.'});
    }
  }catch(err){
    if (err.name = 'ValidatorError') {
      res.status(400).send({message: 'Некорректно переданы данные пользователя'})
    } else {
      res.status(500).send('Ошибка по умолчанию.');
    }
  }
}

exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    if (user) {
      res.status(201).send(user);
    }
  }catch(err){
    if (err.name = 'ValidatorError') {
      res.status(400).send({message: 'Переданы некорректные данные при создании пользователя.'})
    } else {
      res.status(500).send({message: 'Ошибка по умолчанию.'})
    }
  }
}

exports.updateUser  = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    if (user) {
      res.status(200).send(user);
    }else{
      res.status(404).send({message: 'Пользователь с указанным _id не найден.'});
    }
  }catch(err){
    if(err.name === 'ValidatorError') {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
    } else {
      res.status(500).send({ message: 'Ошибка по умолчанию.' });
    }
  }
}

exports.updateUserAvatar  = async (req, res) => {
  try {
    const { avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    if (updatedUser) {
      res.status(200).send(updatedUser);
    }else{
      res.status(404).send({message: 'Пользователь с указанным _id не найден.'});
    }
  }catch(err){
    if(err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию.' });
  }
}