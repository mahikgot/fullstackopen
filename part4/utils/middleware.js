const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');

const authMiddleware = (req, res, next) => {
  if (req.url === '/api/login') return next();

  const authHeader = req.get('Authorization');
  if (authHeader) {
    const isBearer = authHeader.startsWith('Bearer');

    if (isBearer) {
      const token = authHeader.substring(7);
      const verified = jwt.verify(token, SECRET);
      if (verified) {
        res.locals.token = verified;
        return next();
      }
    }
  }
  return res.status(401).end();
};
module.exports = { cors, morgan, authMiddleware };
