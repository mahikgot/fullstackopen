const supertest = require('supertest');
const mongoose = require('mongoose');
const listHelper = require('../utils/list_helper');
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
    const total = listHelper.totalLikes(body);
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
    const fave = listHelper.favoriteBlog(body);
    expect(fave).toEqual(right);
  });
});

describe('backend test', () => {
  test('HTTP GET /api/blogs', async () => {
    const { body } = await api
      .get('/api/blogs')
      .expect(200);
    const ids = body.map((result) => result.id);
    const localIds = blogs.map((result) => result._id);
    expect(ids).toMatchObject(localIds);
  });
});

afterAll(() => {
  mongoose.disconnect();
});
