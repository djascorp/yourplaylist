import { Request, Response } from 'express';
import Playlist from '../models/Playlist'; // Assuming Playlist.ts is available
import { getYouTubeTrackInfo } from '../services/youtubeService'; // Assuming youtubeService.ts is available

interface CreatePlaylistRequestBody {
  name: string;
}

interface AddTrackToPlaylistRequestBody {
  youtube_url: string;
}

// Extend Request to include user property from authMiddleware
declare global {
  namespace Express {
    interface Request {
      user?: { id: number; username: string };
    }
  }
}

/**
 * Create a new playlist.
 */
export const createPlaylist = async (req: Request<{}, {}, CreatePlaylistRequestBody>, res: Response) => {
  try {
    const { name } = req.body;
    const ownerId = req.user?.id; // User ID is extracted from JWT token

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found.' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Name is required.' });
    }

    const result = await Playlist.create({ name, ownerId });

    res.status(201).json({ id: result.insertId, name, ownerId });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a list of playlists.
 */
export const getPlaylists = async (req: Request, res: Response) => {
  const ownerId = req.query.ownerId ? parseInt(req.query.ownerId as string) : null; // Optional: filter by owner

  try {
    const playlists = await Playlist.findAll(ownerId);
    res.status(200).json(playlists);
  } catch (error: any) {
    console.error('Error in Playlist controller:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

/**
 * Get a playlist by its ID.
 */
export const getPlaylist = async (req: Request, res: Response) => {
  try {
    const playlistId = parseInt(req.params.id);

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found.' });
    }

    res.status(200).json(playlist);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Add a track to a playlist.
 */
export const addTrackToPlaylist = async (req: Request<{ id: string }, {}, AddTrackToPlaylistRequestBody>, res: Response) => {
  try {
    const { youtube_url } = req.body;
    const playlistId = parseInt(req.params.id);
    const addedBy = req.user?.id; // User ID is extracted from JWT token

    if (!addedBy) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found.' });
    }

    if (!youtube_url) {
      return res.status(400).json({ message: 'YouTube URL is required!' });
    }

    const { title, duration } = await getYouTubeTrackInfo(youtube_url);

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found.' });
    }

    const result = await Playlist.addTrack(playlistId, { youtube_url, title, duration, addedBy });

    res.status(201).json({ id: result.insertId, youtube_url, title, duration, playlistId, addedBy });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a playlist by its ID.
 */
export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const playlistId = parseInt(req.params.id);

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found.' });
    }

    await Playlist.deleteById(playlistId);

    res.status(200).json({ message: 'Playlist deleted successfully.' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
