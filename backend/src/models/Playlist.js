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
     * Récupérer la liste des playlists.
     * @param {number} ownerId - L'ID du propriétaire (optionnel).
     * @returns {Promise<Array>} - La liste des playlists.
     */
    static async findAll(ownerId = null) {
        try {
            let query = 'SELECT playlists.*, users.username FROM playlists left join users on users.id = playlists.owner_id';
            const params = [];

            if (ownerId) {
                query += ' WHERE owner_id = ?';
                params.push(ownerId);
            }

            const [playlists] = await db.query(query, params);
            return playlists;
        } catch (error) {
            console.error('Erreur dans le modèle Playlist:', error);
            throw error;
        }
    }

    /**
     * Récupérer une playlist par son ID.
     * @param {number} id - L'ID de la playlist.
     * @returns {Promise} - La playlist.
     */
    static async findById(id) {
        const [rows] = await db.query('SELECT playlists.*, users.username FROM playlists left join users on users.id = playlists.owner_id WHERE playlists.id = ?', [id]);
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