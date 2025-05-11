import request from 'supertest';
import app from '../server';
import { getTestToken } from './test-utils';

describe('Book API', () => {
  let authToken: string;
  let bookId: string;
  let authorId = '1'; // Asumsi author dengan ID 1 sudah ada

  beforeAll(async () => {
    authToken = await getTestToken();
  });

  describe('POST /book/create', () => {
    it('should create new book', async () => {
      const res = await request(app)
        .post('/book/create')
        .set('Authorization', authToken)
        .send({
          title: 'Test Book',
          isbn: '1234567890123',
          genre: ['Fiction'],
          publishedYear: 2023,
          author: authorId
        });
      
      expect(res.status).toBe(201);
      expect(res.body.data).toHaveProperty('id');
      bookId = res.body.data.id;
    });
  });

  describe('GET /book/all', () => {
    it('should get all books', async () => {
      const res = await request(app)
        .get('/book/all')
        .set('Authorization', authToken);
      
      expect(res.status).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
    });
  });

  describe('GET /book/author/:authorId', () => {
    it('should get books by author', async () => {
      const res = await request(app)
        .get(`/book/author/${authorId}`)
        .set('Authorization', authToken);
      
      expect(res.status).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
    });
  });
});