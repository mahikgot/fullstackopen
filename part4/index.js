const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const log = require('./utils/logger');

const app = express();

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);
const mongoUrl = 'mongodb://localhost/bloglist';
mongoose.connect(mongoUrl);

app.use(cors);
app.use(morgan('tiny'));

app.get('/api/blogs', (req, res) => {
  Blog
    .find({})
    .then((blogs) => res.json(blogs));
});

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => res.status(201).json(result));
});

const PORT = 3003;
app.listen(PORT, () => log.info(`Server running on port ${PORT}`));
