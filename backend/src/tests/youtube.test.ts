import request from 'supertest';
import app from '../../src/app'; // Assuming app.ts will be at this path

describe('YouTube Stream Integration', () => {
  it('should stream audio from a YouTube URL (failing test)', async () => {
    const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // A valid YouTube URL
    const res = await request(app)
      .get(`/api/stream?url=${encodeURIComponent(youtubeUrl)}`);
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toMatch(/audio/);
  });

  it('should return 400 for an invalid YouTube URL (failing test)', async () => {
    const invalidUrl = 'https://not-youtube.com/invalid';
    const res = await request(app)
      .get(`/api/stream?url=${encodeURIComponent(invalidUrl)}`);
    expect(res.statusCode).toEqual(400);
  });
});
