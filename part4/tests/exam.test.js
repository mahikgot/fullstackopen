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
  test('id defined', async () => {
    const { body } = await api
      .get('/api/blogs')
      .expect(200);
    const ids = body.map((result) => result.id);
    expect(ids).toBeDefined();
  });
});

afterAll(() => {
  mongoose.disconnect();
});
