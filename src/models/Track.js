const db = require('../config/db');

class Track {
    /**
     * Create a new track.
     * @param {Object} track - The track data.
     * @returns {Promise} - The result of the query.
     */
    static async create({ youtubeUrl, title, duration, playlistId }) {
        const [result] = await db.query(
            'INSERT INTO tracks (youtube_url, title, duration, playlist_id) VALUES (?, ?, ?, ?)',
            [youtubeUrl, title, duration, playlistId]
        );
        return result;
    }

    /**
     * Find tracks by playlist ID.
     * @param {number} playlistId - The ID of the playlist.
     * @returns {Promise} - The list of tracks.
     */
    static async findByPlaylistId(playlistId) {
        const [rows] = await db.query('SELECT * FROM tracks WHERE playlist_id = ?', [playlistId]);
        return rows;
    }

    /**
     * Delete a track by ID.
     * @param {number} id - The ID of the track.
     * @returns {Promise} - The result of the query.
     */
    static async deleteById(id) {
        const [result] = await db.query('DELETE FROM tracks WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Track;