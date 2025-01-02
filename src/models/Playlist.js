const db = require('../config/db');

class Playlist {
    static async create({ name, ownerId }) {
        const [result] = await db.query(
            'INSERT INTO playlists (name, owner_id) VALUES (?, ?)',
            [name, ownerId]
        );
        return result;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM playlists WHERE id = ?', [id]);
        return rows[0]; 
    }

    static async findByIdAndDelete(id) {
        const [result] = await db.query('DELETE FROM playlists WHERE id = ?', [id]);
        return result;
    }
}

module.exports = Playlist;