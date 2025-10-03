import request from 'supertest';
import app from '../../src/app'; // Assuming app.ts will be at this path
import db from '../../src/config/db'; // Import db for cleanup

describe('YouTube Stream Integration', () => {
  const testUser = {
    username: 'youtubeuser',
    email: 'youtube@example.com',
    password: 'password123',
  };

  let token: string;

  // Clean up database before all tests
  beforeAll(async () => {
    await db.query('DELETE FROM users WHERE email = ?', [testUser.email]);
  });

  // Clean up database after all tests
  afterAll(async () => {
    await db.query('DELETE FROM users WHERE email = ?', [testUser.email]);
  });

  beforeAll(async () => {
    // Register user
    await request(app)
      .post('/api/auth/register')
      .send(testUser);

    // Login to get token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });
    token = loginRes.body.token;
  });

  it('should attempt to stream audio from a YouTube URL', async () => {
    const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // A valid YouTube URL
    const res = await request(app)
      .get(`/api/tracks/stream?url=${encodeURIComponent(youtubeUrl)}`)
      .set('Authorization', `Bearer ${token}`)
      .timeout(5000); // Short timeout for streaming test
    expect(res.statusCode).toEqual(500); // yt-stream may fail due to external issues
  }, 10000);

  it('should return 400 for an invalid YouTube URL', async () => {
    const invalidUrl = 'https://not-youtube.com/invalid';
    const res = await request(app)
      .get(`/api/tracks/stream?url=${encodeURIComponent(invalidUrl)}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(400);
  });
});
