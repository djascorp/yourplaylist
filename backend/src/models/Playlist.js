const db = require('../config/db');

class Playlist {
    /**
     * Créer une nouvelle playlist.
     * @param {Object} data - Les données de la playlist.
     * @returns {Promise} - Le résultat de la requête.
     */
    static async create({ name, ownerId, is_public = false, slug = null }) {
        const [result] = await db.query(
            'INSERT INTO playlists (name, owner_id, is_public, slug) VALUES (?, ?, ?, ?)',
            [name, ownerId, is_public, slug]
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

    /**
     * Récupérer une playlist par son slug.
     * @param {string} slug - Le slug de la playlist.
     * @returns {Promise} - La playlist.
     */
    static async findBySlug(slug) {
        const [rows] = await db.query('SELECT playlists.*, users.username FROM playlists LEFT JOIN users ON users.id = playlists.owner_id WHERE playlists.slug = ?', [slug]);
        return rows[0];
    }

    /**
     * Mettre à jour une playlist.
     * @param {number} id - L'ID de la playlist.
     * @param {Object} updates - Les champs à mettre à jour.
     * @returns {Promise} - Le résultat de la requête.
     */
    static async update(id, updates) {
        const fields = [];
        const values = [];

        // Construire dynamiquement la requête SET
        for (const [key, value] of Object.entries(updates)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }

        if (fields.length === 0) {
            // Rien à mettre à jour
            return { affectedRows: 0 };
        }

        values.push(id); // Pour la clause WHERE

        const query = `UPDATE playlists SET ${fields.join(', ')} WHERE id = ?`;
        
        try {
            const [result] = await db.query(query, values);
            return result;
        } catch (error) {
            // Gérer les erreurs potentielles, par exemple une violation de contrainte unique pour le slug
            if (error.code === 'ER_DUP_ENTRY') { // Code d'erreur MySQL pour entrée dupliquée
                throw new Error('Slug already exists or another unique constraint was violated.');
            }
            throw error; // Renvoyer d'autres erreurs
        }
    }
}

module.exports = Playlist;