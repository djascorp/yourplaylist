const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    /**
     * Créer un nouvel utilisateur.
     * @param {Object} userData - Les données de l'utilisateur.
     * @returns {Promise} - Le résultat de la requête.
     */
    static async create({ username, email, password }) {
    
        const [result] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );
        return {
            id: result.insertId,
            username,
            email
        };;
    }

    /**
     * Trouver un utilisateur par son email.
     * @param {string} email - L'email de l'utilisateur.
     * @returns {Promise<Object>} - L'utilisateur trouvé.
     */
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    /**
     * Trouver un utilisateur par son ID.
     * @param {number} id - L'ID de l'utilisateur.
     * @returns {Promise<Object>} - L'utilisateur trouvé.
     */
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }


    static async findOne(params = {email, username, id}){
        const req_params = [];
        const req_filter = '';
        
        if(email){
            req_params.push(email);
            req_filter = 'email';
        }
        if(username){
            req_params.push(username);
            req_filter = 'username';
        }
        if(id){
            req_params.push(id);
            req_filter = 'id';
        }

        const [rows] = await db.query(`SELECT * FROM users WHERE ${req_filter} = ?`, req_params);
        return rows[0];
    }

    /**
     * Mettre à jour les informations de l'utilisateur.
     * @param {number} id - L'ID de l'utilisateur.
     * @param {Object} userData - Les nouvelles données de l'utilisateur.
     * @returns {Promise} - Le résultat de la requête.
     */
    static async update(id, { username, email, password }) {
        let query = 'UPDATE users SET ';
        const params = [];
        let updates = [];

        if (username) {
            updates.push('username = ?');
            params.push(username);
        }
        if (email) {
            updates.push('email = ?');
            params.push(email);
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.push('password = ?');
            params.push(hashedPassword);
        }

        query += updates.join(', ') + ' WHERE id = ?';
        params.push(id);

        const [result] = await db.query(query, params);
        return result;
    }

    /**
     * Supprimer un utilisateur par son ID.
     * @param {number} id - L'ID de l'utilisateur.
     * @returns {Promise} - Le résultat de la requête.
     */
    static async deleteById(id) {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result;
    }
}

module.exports = User;