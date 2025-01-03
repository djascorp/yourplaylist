const Playlist = require('../models/Playlist');

/**
 * Créer une nouvelle playlist.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */
exports.createPlaylist = async (req, res) => {
    try {
        const { name } = req.body;
        const ownerId = req.user.id; // L'ID de l'utilisateur est extrait du token JWT

        // Vérifier si le nom de la playlist est fourni
        if (!name) {
            return res.status(400).json({ message: 'Name is required.' });
        }

        // Créer la playlist dans la base de données
        const result = await Playlist.create({ name, ownerId });

        // Retourner la playlist créée
        res.status(201).json({ id: result.insertId, name, ownerId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Récupérer une playlist par son ID.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */
exports.getPlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;

        // Récupérer la playlist depuis la base de données
        const playlist = await Playlist.findById(playlistId);

        // Vérifier si la playlist existe
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }

        // Retourner la playlist
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Ajouter une piste à une playlist.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */
exports.addTrackToPlaylist = async (req, res) => {
    try {
        const { youtube_url, title, duration } = req.body;
        const playlistId = req.params.id;
        const addedBy = req.user.id; // L'ID de l'utilisateur est extrait du token JWT

        // Vérifier si tous les champs sont fournis
        if (!youtube_url || !title || !duration) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Vérifier si la playlist existe
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }

        // Ajouter la piste à la playlist
        const result = await Playlist.addTrack(playlistId, { youtube_url, title, duration, addedBy });

        // Retourner la piste ajoutée
        res.status(201).json({ id: result.insertId, youtube_url, title, duration, playlistId, addedBy });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Supprimer une playlist par son ID.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 */
exports.deletePlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;

        // Vérifier si la playlist existe
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }

        // Supprimer la playlist
        await Playlist.deleteById(playlistId);

        // Retourner un message de succès
        res.status(200).json({ message: 'Playlist deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};