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

blogListRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

blogListRouter.put('/:id', async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

module.exports = blogListRouter;
