import request from 'supertest';
import app from '../server';
import { initializeTestEnv, cleanupTestEnv, TEST_USER } from './test-utils';

describe('Auth API', () => {
  beforeAll(async () => {
    await initializeTestEnv();
  });

  afterAll(async () => {
    await cleanupTestEnv();
  });

  describe('POST /auth/login', () => {
    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: TEST_USER.email,
          password: TEST_USER.password
        });
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data.token');
      expect(res.body).toHaveProperty('data.refreshToken');
    });

    it('should reject invalid credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'wrong@email.com',
          password: 'wrongpassword'
        });
      
      expect(res.status).toBe(401);
    });
  });

  describe('POST /auth/register', () => {
    it('should register new user', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'newpassword123',
          fullname: 'New User'
        });
      
      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty('email', 'newuser@example.com');
    });
  });
});