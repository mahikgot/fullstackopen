const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { SECRET } = require('../utils/config');

loginRouter.post('/', async (req, res) => {
  const { body } = req;

  const user = await User.findOne({ username: body.username });
  if (!user) {
    res.status(401).json({ error: 'username does not exist' });
  }

  const passwordCorrect = await bcrypt.compare(body.password, user.passwordHash);
  if (!passwordCorrect) {
    res.status(401).json({ error: 'password is incorrect' });
  }

  const userInfo = {
    username: body.username,
    name: body.name,
  };
  const token = jwt.sign(userInfo, SECRET);

  res.json({ token, username: body.username, name: body.name });
});

module.exports = loginRouter;
