const jwt = require('jsonwebtoken');
const db = require('../config/db');


const authenticate = async (req, res, next) => {
    // Option pour autoriser l'utilisateur "Visiteur"
    const AUTHORIZE_GUEST = process.env.AUTHORIZE_GUEST == 'true'; // Activez cette option dans .env

    try {
        // Récupérer le token de l'en-tête Authorization
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (AUTHORIZE_GUEST && !token) {
            // Si l'option AUTHORIZE_GUEST est activée et qu'il n'y a pas de token, utiliser l'utilisateur "Visiteur"
            req.user = { id: 1 };
            return next();
        }

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Vérifier si l'utilisateur existe dans la base de données
        const [user] = await db.query('SELECT id, username FROM users WHERE id = ?', [decoded.id]);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token. User not found.' });
        }

        // Ajouter l'utilisateur à la requête
        req.user = user[0];
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticate;