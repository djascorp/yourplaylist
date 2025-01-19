const ytStream = require('yt-stream');

/**
 * Charge les informations d'une musique à partir d'une URL YouTube.
 * @param {string} youtubeUrl - L'URL de la vidéo YouTube.
 * @returns {Promise<{title: string, duration: number}>} - Les informations de la musique.
 */
async function getYouTubeTrackInfo(youtubeUrl) {
    try {
        // Récupérer les informations de la vidéo avec yt-stream
        const info = await ytStream.getInfo(youtubeUrl);
        
        // Extraire le titre et la durée
        const title = info.title;
        const duration = parseInt(info.duration); 
        const author = info.author

        return { title, duration , author};
    } catch (error) {
        console.error('Error fetching YouTube track info:', error);
        throw new Error('Failed to fetch track info from YouTube.');
    }
}


module.exports = { getYouTubeTrackInfo };