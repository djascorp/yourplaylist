const request = require('supertest');
const app = require('../app'); // Importez votre application Express
const Track = require('../models/Track');
const db = require('../config/db');

// // Avant tous les tests, connectez-vous à la base de données
// beforeAll(async () => {
//     await db.query('CREATE TABLE IF NOT EXISTS tracks (id INT AUTO_INCREMENT PRIMARY KEY, youtube_url VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, duration INT NOT NULL, playlist_id INT NOT NULL, added_by INT NOT NULL)');
// });

// // Après tous les tests, nettoyez la base de données
afterAll(async () => {
    await db.query('TRUNCATE TABLE IF EXISTS tracks');
    await db.end();
});

// Test de l'ajout d'une piste
describe('POST /api/tracks', () => {
    it('should add a track to a playlist', async () => {
        const response = await request(app)
            .post('/api/tracks')
            .send({ youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Never Gonna Give You Up', duration: 213, playlist_id: 1, added_by: 1 });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Never Gonna Give You Up');
    });

    it('should return 400 if YouTube URL is invalid', async () => {
        const response = await request(app)
            .post('/api/tracks')
            .send({ youtube_url: 'invalid_url', title: 'Invalid Track', duration: 120, playlist_id: 1, added_by: 1 });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid YouTube URL.');
    });
});

// Test du streaming audio
describe('GET /api/tracks/stream', () => {
    it('should stream audio from a YouTube URL', async () => {
        const response = await request(app)
            .get('/api/tracks/stream')
            .query({ url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });

        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('audio/mpeg');
    });

    it('should return 400 if YouTube URL is missing', async () => {
        const response = await request(app).get('/api/tracks/stream');

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('YouTube URL is required.');
    });
});