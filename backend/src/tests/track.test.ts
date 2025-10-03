import request from 'supertest';
import app from '../../src/app'; // Assuming app.ts will be at this path

describe('Track Addition and Management', () => {
  it('should add a track to a playlist (failing test)', async () => {
    const playlistId = 'some-playlist-id'; // Placeholder
    const res = await request(app)
      .post(`/api/playlists/${playlistId}/tracks`)
      .set('Authorization', 'Bearer YOUR_AUTH_TOKEN') // Placeholder for auth
      .send({
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
  });

  it('should remove a track from a playlist (failing test)', async () => {
    const playlistId = 'some-playlist-id'; // Placeholder
    const trackId = 'some-track-id'; // Placeholder
    const res = await request(app)
      .delete(`/api/playlists/${playlistId}/tracks/${trackId}`)
      .set('Authorization', 'Bearer YOUR_AUTH_TOKEN'); // Placeholder for auth
    expect(res.statusCode).toEqual(204);
  });
});
