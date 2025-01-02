const express = require('express');
const trackController = require('../controllers/trackController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Supprimer une piste par son ID
router.delete('/:trackId', authMiddleware, trackController.deleteTrack);

// Stream audio from a YouTube URL
router.get('/stream',authMiddleware, trackController.streamAudio);

module.exports = router;