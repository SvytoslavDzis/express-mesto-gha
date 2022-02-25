const express = require('express');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const router = express.Router();

router.use('/', usersRouter);
router.use('/', cardsRouter);
router.use((req, res) => {
  res.status(404).send({ message: 'Ресурс не найден.' });
});

module.exports = router;
