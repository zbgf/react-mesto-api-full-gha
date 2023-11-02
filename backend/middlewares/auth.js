const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/error/unauthorized');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization.startsWith('Bearer')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.split('Bearer ')[1];
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};
