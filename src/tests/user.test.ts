import request from 'supertest';
import app from '../server';
import { getTestToken } from './test-utils';

describe('User Profile API', () => {
  let authToken: string;

  beforeAll(async () => {
    authToken = await getTestToken();
  });

  describe('GET /user/detail', () => {
    it('should get user profile', async () => {
      const res = await request(app)
        .get('/user/detail')
        .set('Authorization', authToken);
      
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('email');
      expect(res.body.data).toHaveProperty('fullname');
    });
  });

  describe('POST /user/update', () => {
    it('should update user profile', async () => {
      const res = await request(app)
        .post('/user/update')
        .set('Authorization', authToken)
        .send({
          fullname: 'Updated Name'
        });
      
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('fullname', 'Updated Name');
    });
  });

  describe('POST /user/logout', () => {
    it('should logout successfully', async () => {
      const res = await request(app)
        .post('/user/logout')
        .set('Authorization', authToken);
      
      expect(res.status).toBe(200);
    });
  });
});