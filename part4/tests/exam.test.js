const supertest = require('supertest');
const mongoose = require('mongoose');
const { totalLikes, favoriteBlog, getIds } = require('../utils/list_helper');
const { blogs } = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
});

describe('total likes', () => {
  test('totalLikes', async () => {
    const { body } = await api
      .get('/api/blogs')
      .expect(200);
    const total = totalLikes(body);
    expect(total).toBe(36);
  });
});

describe('highest likes', () => {
  test('favoriteBlog', async () => {
    const right = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };
    const { body } = await api
      .get('/api/blogs')
      .expect(200);
    const fave = favoriteBlog(body);
    expect(fave).toEqual(right);
  });
});

describe('backend test', () => {
  test('HTTP GET /api/blogs', async () => {
    const { body } = await api
      .get('/api/blogs')
      .expect(200);
    const ids = getIds(body);
    const localIds = getIds(blogs);
    expect(ids).toMatchObject(localIds);
  });
  test('HTTP POST /api/blogs', async () => {
    const blog = {
      title: 'tanga ka ba?',
      author: 'Mark Guiang',
      url: 'secrethihe',
      likes: 69,
    };
    const { body } = await api
      .post('/api/blogs')
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const blogWithId = {
      ...blog,
      id: body.id,
    };
    expect(body).toMatchObject(blogWithId);
  });
  test('id defined', async () => {
    const { body } = await api
      .get('/api/blogs')
      .expect(200);
    const ids = getIds(body);
    expect(ids).toBeDefined();
  });
});

afterAll(() => {
  mongoose.disconnect();
});
