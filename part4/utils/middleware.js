const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');

const authMiddleware = (req, res, next) => {
  if (req.url === '/api/login') return next();
  const userData = jwt.verify(res.locals.token, SECRET);
  if (userData) {
    res.locals.userData = userData;
    return next();
  }
  return res.status(401).end();
};

const getToken = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const isBearer = authHeader.startsWith('Bearer');

    if (isBearer) {
      const token = authHeader.substring(7);
      res.locals.token = token;
      return next();
    }
  }
  return next();
};
module.exports = {
  cors, morgan, authMiddleware, getToken,
};
