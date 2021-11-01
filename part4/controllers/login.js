const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { SECRET } = require('../utils/config');

loginRouter.post('/', async (req, res) => {
  const { body } = req;
  const user = await User.findOne({ username: body.username });
  if (!user) {
    return res.status(401).json({ error: 'username does not exist' });
  }

  const passwordCorrect = await bcrypt.compare(body.password, user.passwordHash);
  if (!passwordCorrect) {
    return res.status(401).json({ error: 'password is incorrect' });
  }

  const userInfo = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userInfo, SECRET);

  return res.json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
