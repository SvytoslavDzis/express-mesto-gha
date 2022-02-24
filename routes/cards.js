const express = require('express');
const cardRouter = express.Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', express.json(), createCard);
cardRouter.delete('/cards/:cardId', express.json(), deleteCard);
cardRouter.put('/:cardId/likes', express.json(), likeCard);
cardRouter.delete('/:cardId/likes', express.json(), dislikeCard);

module.exports = cardRouter;