const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  const { body } = req;

  if (!body.username || !body.password) {
    res.status(400).json({ error: 'username and password required' });
  } else if ((body.username.length < 3) || (body.password.length < 3)) {
    res.status(400).json({ error: 'username and password must be at least 3 chars long' });
  }

  const temp = await User.find({ username: body.username });
  if (temp.length >= 1) {
    res.status(400).json({ error: 'username must be unique' });
  }

  const passwordHash = await bcrypt.hash(body.password, 10);
  const userObject = {
    username: body.username,
    name: body.name,
    passwordHash,
  };
  const user = new User(userObject);

  const saved = await user.save();
  res.json(saved);
});

userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = userRouter;
