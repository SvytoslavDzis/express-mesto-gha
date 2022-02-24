const Card = require('../models/card')

exports.getCards = async (req, res) => {
  try {
    const CODE_OK_200 = 200;
    const cards = await Card.find({});
    return res.status(CODE_OK_200).send(cards);
  }
  catch(err){
    const ERROR_CODE_500 = 500;
    return res.status(ERROR_CODE_500).send({message: 'Ошибка по умолчанию.'})
  }
}

exports.createCard = async (req, res) => {
  try {
    const CODE_OK_201 = 201;
    const { name, link } = req.body;
    const сard = new Card({name, link, owner: req.user._id});
    res.status(CODE_OK_201).send(await сard.save());
  }
  catch(err){
    const ERROR_CODE_400 = 400;
    const ERROR_CODE_500 = 500;
    if (err.name === 'ValidationError') {
      return res.status(ERROR_CODE_400).send({message: 'Переданы некорректные данные при создании карточки.'})
    } else {
      return res.status(ERROR_CODE_500).send({message: 'Ошибка по умолчанию.'})
    }
  }
}

exports.deleteCard = async (req, res) => {
  try {
    const CODE_OK_200 = 200;
    const ERROR_CODE_404 = 404;
    const deletedCard = await Card.findById(req.params.cardId);
    if (deletedCard) {
      await Card.findByIdAndRemove(req.params.cardId);
      return res.status(CODE_OK_200).send({deletedCard});
    } else {
      return res.status(ERROR_CODE_404).send({message: 'Карточка с указанным _id не найдена.'});
    }
  }
  catch(err){
    const ERROR_CODE_400 = 400;
    if (err.name === 'CastError') {
      return res.status(ERROR_CODE_400).send({message: 'Карточка с указанным _id не найдена.'});
    }
  }
}

exports.likeCard = async (req, res) => {
  try {
    const CODE_OK_200 = 200;
    const ERROR_CODE_404 = 404;
    const likedCard = await Card.findById(req.params.cardId);
    if (likedCard) {
      await Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true });
      return res.status(CODE_OK_200).send(likedCard);
    }
    else {
      return res.status(ERROR_CODE_404).send({message: 'Передан несуществующий _id карточки.'})
    }
  }
  catch(err){
    const ERROR_CODE_400 = 400;
    const ERROR_CODE_500 = 500;
    if (err.name === 'CastError') {
      return res.status(ERROR_CODE_400).send({message: 'Переданы некорректные данные для постановки лайка.'});
    } else {
      return res.status(ERROR_CODE_500).send({message: 'Ошибка по умолчанию.'})
    }
  }
}

exports.dislikeCard = async (req, res) => {
  try {
    const CODE_OK_200 = 200;
    const ERROR_CODE_404 = 404;
    const dislikedCard = await Card.findById(req.params.cardId);
    if (dislikedCard) {
      await Card.findByIdAndUpdate(req.params.cardId, {$pull: { likes: req.user._id }}, { new: true });
      return res.status(CODE_OK_200).send(dislikedCard);
    }
    else {
      return res.status(ERROR_CODE_404).send({message: 'Передан несуществующий _id карточки.'})
    }
  }
  catch(err){
    const ERROR_CODE_400 = 400;
    const ERROR_CODE_500 = 500;
    if (err.name === 'CastError') {
      return res.status(ERROR_CODE_400).send({message: 'Переданы некорректные данные для снятии лайка.'})
    } else {
      return res.status(ERROR_CODE_500).send({message: 'Ошибка по умолчанию.'})
    }
  }
}