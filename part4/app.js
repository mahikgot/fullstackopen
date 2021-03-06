const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const {
  cors, morgan, authMiddleware, getToken,
} = require('./utils/middleware');

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
app.use(getToken);

app.use('/api/login', loginRouter);
app.post('/api/blogs', authMiddleware, blogListRouter);
app.delete('/api/blogs/*', authMiddleware, blogListRouter);
app.use('/api/blogs', blogListRouter);
app.use('/api/users', userRouter);

module.exports = app;
