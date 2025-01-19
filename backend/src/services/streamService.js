const ytStream = require('yt-stream');
const redisClient = require('../utils/redisClient');

// Fonction pour générer un nombre aléatoire de 5 chiffres
function randomDigit(length) {
    return Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
}

// Fonction pour ajouter un argument aléatoire à l'URL
function addRandomParameter(youtubeUrl) {
    try {
        const url = new URL(youtubeUrl);
        url.searchParams.set('xx', randomDigit(5));
        return url.toString();
    } catch (error) {
        console.error('Invalid URL:', error);
        return youtubeUrl;
    }
}

/**
 * Stream audio from a YouTube URL.
 * @param {string} youtubeUrl - The YouTube URL.
 * @param {Object} res - The response object.
 */
async function doStreaming(youtubeUrl, res) {
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
                EX: 3600 * 3, // Durée de vie du cache : 3 heures (en secondes)
            });
        });

        // Streamer l'audio en temps réel vers le client
        res.header('Content-Type', 'audio/mpeg');
        stream.stream.pipe(res)
            .on('error', (error) => {
                throw new Error(`Error streaming audio: ${error.message}`);
            });
    } catch (error) {
        throw new Error(`Error fetching YouTube video: ${error.message}`);
    }
}

module.exports = { doStreaming };