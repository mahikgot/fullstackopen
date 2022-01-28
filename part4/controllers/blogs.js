const express = require('express');
const Blog = require('../models/blog');

const blogListRouter = express.Router();

blogListRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1 });
  res.json(blogs);
});

blogListRouter.post('/', async (req, res) => {
  const { body } = req;

  const blog = new Blog({
    ...body,
    user: res.locals.userData.id,
  });
  const saved = await blog.save();
  res.json(saved);
});

blogListRouter.delete('/:id', async (req, res) => {
  const toBeDeleted = await Blog.findById(req.params.id);
  if (toBeDeleted.user[0].toString() === res.locals.userData.id) {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } else {
    res.status(401).end();
  }
});

blogListRouter.put('/:id', async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

module.exports = blogListRouter;
