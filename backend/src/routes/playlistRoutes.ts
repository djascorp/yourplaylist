import express from 'express';
import * as playlistController from '../controllers/playlistController'; // Assuming playlistController.ts is available
import * as trackController from '../controllers/trackController'; // Assuming trackController.ts is available
import authenticate from '../middlewares/authMiddleware'; // Assuming authMiddleware.ts is available

const router = express.Router();

// Create a new playlist
router.post('/', authenticate, playlistController.createPlaylist);

// Get a list of playlists
router.get('/', authenticate, playlistController.getPlaylists);

// Get a playlist by ID
router.get('/:id', authenticate, playlistController.getPlaylist);

// Add a track to a playlist
router.post('/:id/tracks', authenticate, playlistController.addTrackToPlaylist);

// Get playlistTracks
router.get('/:playlistId/tracks', authenticate, trackController.getTracksByPlaylist);

// Delete a playlist
router.delete('/:id', authenticate, playlistController.deletePlaylist);

export default router;
