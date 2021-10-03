const express = require('express');
const Blog = require('../models/blog');

const blogListRouter = express.Router();

blogListRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogListRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  const saved = await blog.save();
  res.json(saved);
});

module.exports = blogListRouter;
