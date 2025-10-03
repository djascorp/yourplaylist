import request from 'supertest';
import app from '../../src/app'; // Assuming app.ts will be at this path
import db from '../../src/config/db'; // Import db for cleanup

describe('Playlist Creation and Management', () => {
  const testUser = {
    username: 'playlistuser',
    email: 'playlist@example.com',
    password: 'password123',
  };

  let token: string;

  // Clean up database before all tests
  beforeAll(async () => {
    await db.query('DELETE FROM users WHERE email = ?', [testUser.email]);
    await db.query('DELETE FROM playlists WHERE name = ?', ['My New Playlist']);
  });

  // Clean up database after all tests
  afterAll(async () => {
    await db.query('DELETE FROM users WHERE email = ?', [testUser.email]);
    await db.query('DELETE FROM playlists WHERE name = ?', ['My New Playlist']);
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

  it('should create a new playlist', async () => {
    const res = await request(app)
      .post('/api/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'My New Playlist',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual('My New Playlist');
  });

  it('should get user playlists', async () => {
    const res = await request(app)
      .get('/api/playlists')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
