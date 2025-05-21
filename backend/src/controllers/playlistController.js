const Playlist = require('../models/Playlist');
const { getYouTubeTrackInfo } = require('../services/youtubeService');
const { generateSlug } = require('../utils/slugUtils'); // Import generateSlug

/**
 * Create a new playlist.
 * @param {Object} req - HTTP request.
 * @param {Object} res - HTTP response.
 */
exports.createPlaylist = async (req, res) => {
    try {
        const { name } = req.body;
        const ownerId = req.user.id; 

        if (!name) {
            return res.status(400).json({ message: 'Name is required.' });
        }

        // Create playlist with default is_public: false and slug: null
        const playlistData = {
            name,
            ownerId,
            is_public: false, // Default value
            slug: null,       // Default value
        };
        const result = await Playlist.create(playlistData);
        
        // Fetch the created playlist to return its full data including defaults
        const createdPlaylist = await Playlist.findById(result.insertId);

        res.status(201).json(createdPlaylist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Get playlists for the authenticated user.
 * @param {Object} req - HTTP request.
 * @param {Object} res - HTTP response.
 */
exports.getUserPlaylists = async (req, res) => {
    try {
        const ownerId = req.user.id; // Strictly fetch playlists for the authenticated user
        const playlists = await Playlist.findAll(ownerId); // Playlist.findAll is used as findByUserId
        res.status(200).json(playlists);
    } catch (error) {
        console.error('Error in getUserPlaylists controller:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

/**
 * Get a playlist by its ID, respecting privacy.
 * @param {Object} req - HTTP request.
 * @param {Object} res - HTTP response.
 */
exports.getPlaylistById = async (req, res) => {
    try {
        const playlistId = req.params.id;
        const userId = req.user ? req.user.id : null; // Handle anonymous users if applicable

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }

        // Check if the playlist is public or if the user owns it
        if (!playlist.is_public && playlist.owner_id !== userId) {
            return res.status(403).json({ message: 'Forbidden: You do not have access to this playlist.' });
        }

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Get a public playlist by its slug.
 * @param {Object} req - HTTP request.
 * @param {Object} res - HTTP response.
 */
exports.getPublicPlaylistBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const playlist = await Playlist.findBySlug(slug);

        if (!playlist || !playlist.is_public) {
            return res.status(404).json({ message: 'Public playlist not found or access denied.' });
        }

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Share a playlist owned by the authenticated user.
 * @param {Object} req - HTTP request.
 * @param {Object} res - HTTP response.
 */
exports.sharePlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;
        const userId = req.user.id;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }

        if (playlist.owner_id !== userId) {
            return res.status(403).json({ message: 'Forbidden: You do not own this playlist.' });
        }

        if (playlist.is_public && playlist.slug) {
            // Already public and has a slug, return current data
            return res.status(200).json(playlist);
        }

        const updates = { is_public: true };
        if (!playlist.slug) {
            // For simplicity, generate slug once. DB unique constraint handles collisions.
            // A more robust implementation might loop with findBySlug if update doesn't check.
            updates.slug = generateSlug();
        }

        const updateResult = await Playlist.update(playlistId, updates);
        if (updateResult.affectedRows === 0) {
             // This might happen if the playlist was deleted just before the update
            return res.status(404).json({ message: 'Playlist not found or no changes made.' });
        }
        
        const updatedPlaylist = await Playlist.findById(playlistId);
        res.status(200).json(updatedPlaylist);

    } catch (error) {
         // Handle potential slug collision if not caught by Playlist.update gracefully
        if (error.message.includes('Slug already exists')) {
            return res.status(409).json({ message: 'Failed to generate a unique slug. Please try again.' });
        }
        res.status(500).json({ message: error.message });
    }
};

/**
 * Unshare (make private) a playlist owned by the authenticated user.
 * @param {Object} req - HTTP request.
 * @param {Object} res - HTTP response.
 */
exports.unsharePlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;
        const userId = req.user.id;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }

        if (playlist.owner_id !== userId) {
            return res.status(403).json({ message: 'Forbidden: You do not own this playlist.' });
        }

        if (!playlist.is_public) {
            // Already private, return current data
            return res.status(200).json(playlist);
        }

        const updates = { is_public: false }; // Slug is kept
        await Playlist.update(playlistId, updates);
        
        const updatedPlaylist = await Playlist.findById(playlistId);
        res.status(200).json(updatedPlaylist);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Existing functions (addTrackToPlaylist, deletePlaylist) - ensure they respect ownership if necessary

/**
 * Add a track to a playlist. (Ownership check might be needed before adding)
 * @param {Object} req - HTTP request.
 * @param {Object} res - HTTP response.
 */
exports.addTrackToPlaylist = async (req, res) => {
    try {
        const { youtube_url } = req.body; 
        const playlistId = req.params.id;
        const addedBy = req.user.id; 

        if (!youtube_url) {
            return res.status(400).json({ message: 'YouTube URL is required.' });
        }

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }
        
        // Ownership check: Only owner or collaborators (if feature exists) should add tracks
        if (playlist.owner_id !== req.user.id) {
             // If playlist is public but not owned, user shouldn't add tracks unless collaboration is a feature
            if(!playlist.is_public) { // if private and not owner
                 return res.status(403).json({ message: 'Forbidden: You cannot add tracks to this playlist.' });
            }
            // Allowing adding to public playlists by anyone - this might be desired or not.
            // For now, let's restrict to owner only.
             return res.status(403).json({ message: 'Forbidden: Only the playlist owner can add tracks.' });
        }


        const { title, duration } = await getYouTubeTrackInfo(youtube_url);
        const result = await Playlist.addTrack(playlistId, { youtube_url, title, duration, addedBy });

        res.status(201).json({ id: result.insertId, youtube_url, title, duration, playlistId, addedBy });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Delete a playlist by its ID. (Ownership check is crucial)
 * @param {Object} req - HTTP request.
 * @param {Object} res - HTTP response.
 */
exports.deletePlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;
        const userId = req.user.id;

        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }

        // Crucial ownership check
        if (playlist.owner_id !== userId) {
            return res.status(403).json({ message: 'Forbidden: You do not own this playlist.' });
        }

        await Playlist.deleteById(playlistId);
        res.status(200).json({ message: 'Playlist deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};