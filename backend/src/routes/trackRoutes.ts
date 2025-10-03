import express from 'express';
import * as trackController from '../controllers/trackController'; // Assuming trackController.ts is available
import authenticate from '../middlewares/authMiddleware'; // Assuming authMiddleware.ts is available

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tracks
 *   description: Track management and streaming
 */

/**
 * @swagger
 * /api/tracks/{trackId}:
 *   delete:
 *     summary: Delete a track by its ID
 *     tags: [Tracks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: trackId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The track ID
 *     responses:
 *       200:
 *         description: Track deleted successfully
 *       400:
 *         description: Track ID is required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Track not found
 *       500:
 *         description: Server error
 */
router.delete('/:trackId', authenticate, trackController.deleteTrack);

/**
 * @swagger
 * /api/tracks/stream:
 *   get:
 *     summary: Stream audio from a YouTube URL
 *     tags: [Tracks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: The YouTube URL of the video to stream
 *     responses:
 *       200:
 *         description: Audio stream
 *         content:
 *           audio/mpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: YouTube URL is required or invalid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/stream', authenticate, trackController.streamAudio);

/**
 * @swagger
 * /api/tracks/streamByTrack/{trackId}:
 *   get:
 *     summary: Stream audio from a track ID
 *     tags: [Tracks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: trackId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the track to stream
 *     responses:
 *       200:
 *         description: Audio stream
 *         content:
 *           audio/mpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Track ID is required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Track not found
 *       500:
 *         description: Server error
 */
router.get('/streamByTrack/:trackId', authenticate, trackController.streamAudioFromTrackId);

export default router;