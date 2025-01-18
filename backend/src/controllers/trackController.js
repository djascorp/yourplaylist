const ytStream = require('yt-stream');
const Track = require('../models/Track');
const logger = require('../utils/logger');
const redisClient = require('../utils/redisClient');

// Fonction pour générer un nombre aléatoire de 5 chiffres
function randomDigit(length) {
    return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
}

// Fonction pour ajouter un argument aléatoire à l'URL
function addRandomParameter(youtubeUrl) {
    try {
        // Crée un objet URL à partir de l'URL fournie
        const url = new URL(youtubeUrl);

        // Ajoute un paramètre aléatoire (x=12345)
        url.searchParams.set('xx', randomDigit(5));

        // Retourne l'URL modifiée
        return url.toString();
    } catch (error) {
        // En cas d'erreur (par exemple, si l'URL est invalide), retourne l'URL d'origine
        console.error('Invalid URL:', error);
        return youtubeUrl;
    }
}

/**
 * Stream audio from a YouTube URL.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.streamAudio = async (req, res) => {
    const youtubeUrl = req.query.url;

    // Générer une clé unique pour le cache basée sur l'URL
    const cacheKey = `audio:${youtubeUrl}`;

    try {
        // Vérifier si l'audio est déjà en cache dans Redis
        const cachedAudio = await redisClient.get(cacheKey);

        if (cachedAudio) {
            console.log("Serving from Redis cache");
            res.header('Content-Type', 'audio/mpeg');

            // Convertir les données base64 en buffer et les envoyer
            const audioBuffer = Buffer.from(cachedAudio, 'base64');
            return res.send(audioBuffer);
        }

        console.log("GET STREAM");
        // Get audio stream from YouTube URL
        const stream = await ytStream.stream(addRandomParameter(youtubeUrl), { audioOnly: true });

        // Collecter les données du flux dans un buffer pour les mettre en cache
        let audioData = [];
        stream.stream.on('data', (chunk) => {
            audioData.push(chunk);
        });

        stream.stream.on('end', async () => {
            // Convertir les données en un seul buffer
            const audioBuffer = Buffer.concat(audioData);

            // Mettre en cache le buffer audio dans Redis (en base64)
            await redisClient.set(cacheKey, audioBuffer.toString('base64'), {
                EX: 3600 * 3, // Durée de vie du cache : 3 heure (en secondes)
            });
        });

        // Streamer l'audio en temps réel vers le client
        res.header('Content-Type', 'audio/mpeg');
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
    const { trackId: id } = req.params;

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