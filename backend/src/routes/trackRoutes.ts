import express from 'express';
import * as trackController from '../controllers/trackController'; // Assuming trackController.ts is available
import authenticate from '../middlewares/authMiddleware'; // Assuming authMiddleware.ts is available

const router = express.Router();

// Delete a track by its ID
router.delete('/:trackId', authenticate, trackController.deleteTrack);

// Stream audio from a YouTube URL
router.get('/stream', authenticate, trackController.streamAudio);

// Stream audio from a track ID
router.get('/streamByTrack/:trackId', authenticate, trackController.streamAudioFromTrackId);

export default router;
