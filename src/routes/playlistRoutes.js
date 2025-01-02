const express = require('express');
const playlistController = require('../controllers/playlistController');
// const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new playlist
router.post('/', playlistController.createPlaylist);

// Get a playlist by ID
router.get('/:id', playlistController.getPlaylist);

// Add a track to a playlist
router.post('/:id/tracks', playlistController.addTrackToPlaylist);

// Delete a playlist
router.delete('/:id', playlistController.deletePlaylist);

module.exports = router;