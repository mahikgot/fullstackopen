const express = require('express');
const { cors, morgan } = require('./utils/middleware');
const blogListRouter = require('./controllers/blogs');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/blogs', blogListRouter);

module.exports = app;
