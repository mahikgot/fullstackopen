const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  const { body } = req;

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
