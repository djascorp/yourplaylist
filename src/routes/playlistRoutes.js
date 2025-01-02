const express = require('express');
const playlistController = require('../controllers/playlistController');
const trackController = require('../controllers/trackController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new playlist
router.post('/', authMiddleware, playlistController.createPlaylist);

// Get a playlist by ID
router.get('/:id', authMiddleware, playlistController.getPlaylist);

// Add a track to a playlist
router.post('/:id/tracks', authMiddleware, playlistController.addTrackToPlaylist);

// Get playlistTracks
router.get('/:playlistId/tracks', authMiddleware, trackController.getTracksByPlaylist);

// Delete a playlist
router.delete('/:id', authMiddleware, playlistController.deletePlaylist);

module.exports = router;