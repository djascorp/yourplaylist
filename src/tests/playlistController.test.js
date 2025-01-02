const request = require('supertest');
const app = require('../app'); // Importez votre application Express
const Playlist = require('../models/Playlist');
const db = require('../config/db');

// Avant tous les tests, connectez-vous à la base de données
// beforeAll(async () => {
//     await db.query('CREATE TABLE IF NOT EXISTS playlists (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, owner_id INT NOT NULL)');
// });

// // Après tous les tests, nettoyez la base de données
afterAll(async () => {
    await db.query('TRUNCATE TABLE IF EXISTS playlists');
    await db.end();
});

// Test de la création d'une playlist
describe('POST /api/playlists', () => {
    it('should create a new playlist', async () => {
        const response = await request(app)
            .post('/api/playlists')
            .send({ name: 'My Playlist', owner_id: 1 });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('My Playlist');
    });

    it('should return 400 if name is missing', async () => {
        const response = await request(app)
            .post('/api/playlists')
            .send({ owner_id: 1 });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Name is required.');
    });
});

// Test de la récupération d'une playlist
describe('GET /api/playlists/:id', () => {
    it('should get a playlist by ID', async () => {
        // Créez une playlist pour le test
        const [result] = await db.query('INSERT INTO playlists (name, owner_id) VALUES (?, ?)', ['Test Playlist', 1]);
        const playlistId = result.insertId;

        const response = await request(app).get(`/api/playlists/${playlistId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(playlistId);
        expect(response.body.name).toBe('Test Playlist');
    });

    it('should return 404 if playlist is not found', async () => {
        const response = await request(app).get('/api/playlists/999');

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Playlist not found.');
    });
});