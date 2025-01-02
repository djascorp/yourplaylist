const express = require('express');
const trackController = require('../controllers/trackController');

const router = express.Router();

// Stream audio from a YouTube URL
router.get('/stream', trackController.streamAudio);

module.exports = router;