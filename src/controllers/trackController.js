const ytStream = require('yt-stream');
const Track = require('../models/Track');
const logger = require('../utils/logger');

/**
 * Stream audio from a YouTube URL.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.streamAudio = async (req, res) => {
    const youtubeUrl = req.query.url;

    console.log("GET STREAM")
    try {
        // Get audio stream from YouTube URL
        const stream = await ytStream.stream(youtubeUrl, { audioOnly: true });

        // Set response headers
        res.header('Content-Type', 'audio/mpeg');

        // Stream the audio
        stream.stream.pipe(res)
            .on('error', (error) => {
                logger.error('Error streaming audio:', error);
                res.status(500).json({ message: 'Error streaming audio.' });
            });
    } catch (error) {
        logger.error('Error fetching YouTube video:', error);
        res.status(500).json({ message: 'Error fetching YouTube video.' });
    }
};

/**
 * Add a track to the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.addTrack = async (req, res) => {
    const { youtubeUrl, playlistId } = req.body;

    try {
        // Get video info
        const info = await ytStream.getInfo(youtubeUrl);

        // Create a new track
        const track = await Track.create({
            youtubeUrl,
            title: info.title,
            duration: info.duration,
            playlistId,
        });

        res.status(201).json(track);
    } catch (error) {
        logger.error('Error adding track:', error);
        res.status(500).json({ message: 'Error adding track.' });
    }
};

/**
 * Get all tracks in a playlist.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getTracksByPlaylist = async (req, res) => {
    const { playlistId } = req.params;

    try {
        const tracks = await Track.findByPlaylistId(playlistId);
        res.status(200).json(tracks);
    } catch (error) {
        logger.error('Error fetching tracks:', error);
        res.status(500).json({ message: 'Error fetching tracks.' });
    }
};

/**
 * Delete a track by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.deleteTrack = async (req, res) => {
    const { trackId : id } = req.params;

    try {
        const result = await Track.deleteById(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Track not found.' });
        }
        res.status(200).json({ message: 'Track deleted successfully.' });
    } catch (error) {
        logger.error('Error deleting track:', error);
        res.status(500).json({ message: 'Error deleting track.' });
    }
};