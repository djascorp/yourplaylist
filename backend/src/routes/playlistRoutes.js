const express = require('express');
const playlistController = require('../controllers/playlistController');
const trackController = require('../controllers/trackController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new playlist
router.post('/', authMiddleware, playlistController.createPlaylist);

// Get playlists for the authenticated user
router.get('/', authMiddleware, playlistController.getUserPlaylists);

// Get a playlist by its ID (respects privacy)
router.get('/:id', authMiddleware, playlistController.getPlaylistById);

// Public route to get a shared playlist by slug - NO AUTH MIDDLEWARE
router.get('/shared/:slug', playlistController.getPublicPlaylistBySlug);

// Add a track to a playlist (ownership/permissions checked in controller)
router.post('/:id/tracks', authMiddleware, playlistController.addTrackToPlaylist);

// Get playlistTracks
router.get('/:playlistId/tracks', authMiddleware, trackController.getTracksByPlaylist);

// Delete a playlist (ownership checked in controller)
router.delete('/:id', authMiddleware, playlistController.deletePlaylist);

// Share a playlist (make it public and generate slug if needed)
router.post('/:id/share', authMiddleware, playlistController.sharePlaylist);

// Unshare a playlist (make it private)
router.post('/:id/unshare', authMiddleware, playlistController.unsharePlaylist);

module.exports = router;