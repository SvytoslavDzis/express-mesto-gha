const jwt = require('jsonwebtoken')
const { UnАuthorizedError } = require('../errors/UnАuthorizedError');

module.exports = (req, res, next) => {
   // достаём авторизационный заголовок
  const { authorization } = req.headers;

  if(!authorization || !authorization.startsWith('Bearer ')){
    throw new UnАuthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new UnАuthorizedError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
}