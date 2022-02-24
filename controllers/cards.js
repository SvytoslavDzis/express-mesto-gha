const Card = require('../models/card')

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  }
  catch(err){
    res.status(500).send({message: 'Ошибка по умолчанию.'})
  }
}

exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const сard = new Card({name, link, owner: req.user._id});
    res.status(201).send(await сard.save());
  }
  catch(err){
    console.log(err)
    if (err.name == 'ValidatorError') {
      res.status(400).send({message: 'Переданы некорректные данные при создании карточки.'})
    } else {
      res.status(500).send({message: 'Ошибка по умолчанию.'})
    }
  }
}

exports.deleteCard = async (req, res) => {
  try {
    const deletedCard = await Card.findById(req.params.cardId);
    if (deletedCard) {
      await Card.findByIdAndRemove(req.params.cardId);
      res.status(200).send({deletedCard});
    }
  }
  catch(err){
    if (err.name == 'CastError') {
      res.status(400).send({message: 'Карточка с указанным _id не найдена.'});
    }
  }
}

exports.likeCard = async (req, res) => {
  try {
    const likedCard = await Card.findById(req.params.cardId);
    if (likedCard) {
      await Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true });
        res.status(200).send(likedCard);
    }
    else {
      res.status(404).send({message: 'Передан несуществующий _id карточки.'})
    }
  }
  catch(err){
    if (err.name == 'CastError') {
      res.status(400).send({message: 'Переданы некорректные данные для постановки лайка.'});
    } else {
      res.status(500).send({message: 'Ошибка по умолчанию.'})
    }
  }
}

exports.dislikeCard = async (req, res) => {
  try {
    const dislikedCard = await Card.findById(req.params.cardId);
    if (dislikedCard) {
      await Card.findByIdAndUpdate(req.params.cardId, {$pull: { likes: req.user._id }}, { new: true });
        res.status(200).send(dislikedCard);
    }
    else {
      return res.status(404).send({message: 'Передан несуществующий _id карточки.'})
    }
  }
  catch(err){
    if (err.name == 'CastError') {
      res.status(400).send({message: 'Переданы некорректные данные для снятии лайка.'})
    } else {
    res.status(500).send({message: 'Ошибка по умолчанию.'})
    }
  }
}