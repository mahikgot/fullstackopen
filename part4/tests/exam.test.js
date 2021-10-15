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
  test('likes 0 if missing from request', async () => {
    const blog = {
      title: 'tanga ka ba?',
      author: 'Mark Guiang',
      url: 'secrethihe',
    };
    const { body } = await api
      .post('/api/blogs')
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(body.likes).toBe(0);
  });
  test('delete one blog post', async () => {
    const id = '5a422a851b54a676234d17f7';
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204);
  });
  test('update likes', async () => {
    const updated = {
      title: 'React patterns',
      id: '5a422a851b54a676234d17f7',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 1,
    };
    const { body } = await api
      .put(`/api/blogs/${updated.id}`)
      .send(updated)
      .expect(200);
    expect(body).toEqual(updated);
  });
});

afterAll(() => {
  mongoose.disconnect();
});
