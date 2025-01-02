const db = require('../config/db');

class Playlist {
    /**
     * Créer une nouvelle playlist.
     * @param {Object} data - Les données de la playlist.
     * @returns {Promise} - Le résultat de la requête.
     */
    static async create({ name, ownerId }) {
        const [result] = await db.query(
            'INSERT INTO playlists (name, owner_id) VALUES (?, ?)',
            [name, ownerId]
        );
        return result;
    }

    /**
     * Récupérer une playlist par son ID.
     * @param {number} id - L'ID de la playlist.
     * @returns {Promise} - La playlist.
     */
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM playlists WHERE id = ?', [id]);
        return rows[0];
    }

    /**
     * Ajouter une piste à une playlist.
     * @param {number} playlistId - L'ID de la playlist.
     * @param {Object} trackData - Les données de la piste.
     * @returns {Promise} - Le résultat de la requête.
     */
    static async addTrack(playlistId, { youtube_url, title, duration, addedBy }) {
        const [result] = await db.query(
            'INSERT INTO tracks (youtube_url, title, duration, playlist_id, added_by) VALUES (?, ?, ?, ?, ?)',
            [youtube_url, title, duration, playlistId, addedBy]
        );
        return result;
    }

    /**
     * Supprimer une playlist par son ID.
     * @param {number} id - L'ID de la playlist.
     * @returns {Promise} - Le résultat de la requête.
     */
    static async deleteById(id) {
        const [result] = await db.query('DELETE FROM playlists WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Playlist;