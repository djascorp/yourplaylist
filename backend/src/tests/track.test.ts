import request from 'supertest';
import app from '../../src/app'; // Assuming app.ts will be at this path
import db from '../../src/config/db'; // Import db for cleanup

describe('Track Addition and Management', () => {
  const testUser = {
    username: 'trackuser',
    email: 'track@example.com',
    password: 'password123',
  };

  let token: string;
  let playlistId: number;
  let trackId: number;

  // Clean up database before all tests
  beforeAll(async () => {
    await db.query('DELETE FROM users WHERE email = ?', [testUser.email]);
    await db.query('DELETE FROM playlists WHERE name = ?', ['Test Playlist']);
    await db.query('DELETE FROM tracks WHERE youtube_url = ?', ['https://www.youtube.com/watch?v=dQw4w9WgXcQ']);
  });

  // Clean up database after all tests
  afterAll(async () => {
    await db.query('DELETE FROM users WHERE email = ?', [testUser.email]);
    await db.query('DELETE FROM playlists WHERE name = ?', ['Test Playlist']);
    await db.query('DELETE FROM tracks WHERE youtube_url = ?', ['https://www.youtube.com/watch?v=dQw4w9WgXcQ']);
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

    // Create playlist
    const playlistRes = await request(app)
      .post('/api/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Playlist',
      });
    playlistId = playlistRes.body.id;
  });

  it('should add a track to a playlist', async () => {
    const res = await request(app)
      .post(`/api/playlists/${playlistId}/tracks`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    trackId = res.body.id;
  });

  it('should remove a track from a playlist', async () => {
    const res = await request(app)
      .delete(`/api/tracks/${trackId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(204);
  });
});
