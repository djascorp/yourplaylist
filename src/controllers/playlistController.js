const Playlist = require('../models/Playlist');

exports.createPlaylist = async (req, res) => {
    try {
        const { name } = req.body;
        const ownerId = req.user.id;

        const playlist = await Playlist.create({ name, ownerId });
        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addTrackToPlaylist = async (req, res) => {
    try {
        const { youtubeUrl } = req.body;
        const playlist = await Playlist.findById(req.params.id);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }

        playlist.tracks.push({ youtubeUrl });
        await playlist.save();

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findByIdAndDelete(req.params.id);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }
        res.status(200).json({ message: 'Playlist deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};