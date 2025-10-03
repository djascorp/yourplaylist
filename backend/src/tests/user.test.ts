import request from 'supertest';
import app from '../../src/app'; // Assuming app.ts will be at this path
import db from '../../src/config/db'; // Import db for cleanup

describe('User Authentication and Management', () => {
  const testUser = {
    username: 'usertestuser',
    email: 'user@example.com',
    password: 'password123',
  };

  // Clean up database before all tests
  beforeAll(async () => {
    await db.query('DELETE FROM users WHERE email = ?', [testUser.email]);
  });

  // Clean up database after all tests
  afterAll(async () => {
    await db.query('DELETE FROM users WHERE email = ?', [testUser.email]);
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login an existing user', async () => {
    // First, ensure the user is registered (from the previous test or setup)
    // This test assumes the registration test passed or user exists.
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});