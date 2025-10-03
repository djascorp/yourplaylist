import request from 'supertest';
import app from '../../src/app'; // Assuming app.ts will be at this path

describe('Playlist Creation and Management', () => {
  it('should create a new playlist (failing test)', async () => {
    const res = await request(app)
      .post('/api/playlists')
      .set('Authorization', 'Bearer YOUR_AUTH_TOKEN') // Placeholder for auth
      .send({
        title: 'My New Playlist',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toEqual('My New Playlist');
  });

  it('should get user playlists (failing test)', async () => {
    const res = await request(app)
      .get('/api/playlists')
      .set('Authorization', 'Bearer YOUR_AUTH_TOKEN'); // Placeholder for auth
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
