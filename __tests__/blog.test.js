import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../index.js';

describe('Blog Tests', () => {
  let authToken;
  let testBlogId;

  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/blog_test');
    
    // Create a test user and get auth token
    const userData = {
      username: 'blogtestuser',
      email: 'blogtest@example.com',
      password: 'password123'
    };

    await request(app)
      .post('/api/auth/register')
      .send(userData);

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: userData.password
      });

    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('POST /api/blogs', () => {
    it('should create a new blog post', async () => {
      const blogData = {
        title: 'Test Blog Post',
        content: 'This is a test blog post content',
        category: 'Technology'
      };

      const response = await request(app)
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(blogData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('blog');
      expect(response.body.blog.title).toBe(blogData.title);
      
      testBlogId = response.body.blog._id;
    });

    it('should not create a blog post without authentication', async () => {
      const blogData = {
        title: 'Unauthorized Blog Post',
        content: 'This should fail',
        category: 'Technology'
      };

      const response = await request(app)
        .post('/api/blogs')
        .send(blogData);

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/blogs', () => {
    it('should get all blog posts', async () => {
      const response = await request(app)
        .get('/api/blogs');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.blogs)).toBe(true);
      expect(response.body.blogs.length).toBeGreaterThan(0);
    });

    it('should get a specific blog post by ID', async () => {
      const response = await request(app)
        .get(`/api/blogs/${testBlogId}`);

      expect(response.status).toBe(200);
      expect(response.body.blog).toHaveProperty('_id', testBlogId);
    });
  });

  describe('PUT /api/blogs/:id', () => {
    it('should update a blog post', async () => {
      const updateData = {
        title: 'Updated Blog Post',
        content: 'This is the updated content'
      };

      const response = await request(app)
        .put(`/api/blogs/${testBlogId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.blog.title).toBe(updateData.title);
    });
  });

  describe('DELETE /api/blogs/:id', () => {
    it('should delete a blog post', async () => {
      const response = await request(app)
        .delete(`/api/blogs/${testBlogId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Blog deleted successfully');
    });
  });
}); 