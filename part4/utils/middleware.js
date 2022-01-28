const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');

const authMiddleware = (req, res, next) => {
  try {
    const userData = jwt.verify(res.locals.token, SECRET);
    res.locals.userData = userData;
    return next();
  } catch (error) {
    return res.status(401).end();
  }
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
