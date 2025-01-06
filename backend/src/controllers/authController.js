const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { generateToken } = require('../utils/auth');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Inscription avec email/nom d'utilisateur
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Créer un nouvel utilisateur
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });
        console.log("NEW USER", newUser);
        // Générer un token JWT
        const token = generateToken(newUser);
        res.status(201).json({ token });
    } catch (err) {
        console.error('Error in register:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Connexion avec email/nom d'utilisateur
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Trouver l'utilisateur par email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log("TOKEN", user);
        // Générer un token JWT
        const token = generateToken(user);
        res.json({ token });
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Authentification avec Google
exports.googleAuth = async (req, res) => {
    const { tokenId } = req.body;

    try {
        // Vérifier le token Google
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const { email, name } = ticket.getPayload();

        // Vérifier si l'utilisateur existe déjà
        let user = await User.findByEmail(email);
        if (!user) {
            // Créer un nouvel utilisateur si nécessaire
            const hashedPassword = await bcrypt.hash(email + process.env.JWT_SECRET, 10);
            user = await User.create({ username: name, email, password: hashedPassword });
        }

        // Générer un token JWT
        const token = generateToken(user);
        res.json({ token });
    } catch (err) {
        console.error('Error in googleAuth:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Déconnexion
exports.logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};