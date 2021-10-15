const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const { cors, morgan } = require('./utils/middleware');
const blogListRouter = require('./controllers/blogs');

const app = express();

mongoose.connect(config.MONGODB_URL);

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
}

app.use('/api/blogs', blogListRouter);

module.exports = app;
