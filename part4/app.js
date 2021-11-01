const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const { cors, morgan, authMiddleware } = require('./utils/middleware');

const loginRouter = require('./controllers/login');
const blogListRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');

const app = express();

mongoose.connect(config.MONGODB_URL);

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
}
app.post('/api/*', authMiddleware);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogListRouter);
app.use('/api/users', userRouter);

module.exports = app;
