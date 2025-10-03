import express from 'express';
import * as playlistController from '../controllers/playlistController'; // Assuming playlistController.ts is available
import * as trackController from '../controllers/trackController'; // Assuming trackController.ts is available
import authenticate from '../middlewares/authMiddleware'; // Assuming authMiddleware.ts is available

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Playlists
 *   description: Playlist management
 */

/**
 * @swagger
 * /api/playlists:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *       400:
 *         description: Name is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', authenticate, playlistController.createPlaylist);

/**
 * @swagger
 * /api/playlists:
 *   get:
 *     summary: Get a list of playlists
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ownerId
 *         schema:
 *           type: integer
 *         description: Optional owner ID to filter playlists
 *     responses:
 *       200:
 *         description: List of playlists
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', authenticate, playlistController.getPlaylists);

/**
 * @swagger
 * /api/playlists/{id}:
 *   get:
 *     summary: Get a playlist by ID
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The playlist ID
 *     responses:
 *       200:
 *         description: Playlist data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authenticate, playlistController.getPlaylist);

/**
 * @swagger
 * /api/playlists/{id}/tracks:
 *   post:
 *     summary: Add a track to a playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The playlist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - youtube_url
 *             properties:
 *               youtube_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Track added successfully
 *       400:
 *         description: YouTube URL is required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Server error
 */
router.post('/:id/tracks', authenticate, playlistController.addTrackToPlaylist);

/**
 * @swagger
 * /api/playlists/{playlistId}/tracks:
 *   get:
 *     summary: Get all tracks in a playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The playlist ID
 *     responses:
 *       200:
 *         description: List of tracks in the playlist
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Server error
 */
router.get('/:playlistId/tracks', authenticate, trackController.getTracksByPlaylist);

/**
 * @swagger
 * /api/playlists/{id}:
 *   delete:
 *     summary: Delete a playlist by ID
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The playlist ID
 *     responses:
 *       200:
 *         description: Playlist deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authenticate, playlistController.deletePlaylist);

export default router;