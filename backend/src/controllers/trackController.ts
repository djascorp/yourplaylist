import { Request, Response } from 'express';
import * as ytStream from 'yt-stream';
import Track from '../models/Track'; // Assuming Track.ts is available
import { error as loggerError } from '../utils/logger'; // Assuming logger.ts is available
import { getAudioStream } from '../services/streamService'; // Assuming streamService.ts is available

/**
 * Interface for the request body of the addTrack endpoint.
 */
interface AddTrackRequestBody {
  youtubeUrl: string;
  playlistId: number;
}

// Extend Request to include query parameters for streamAudio
declare global {
  namespace Express {
    interface Request {
      query: {
        url?: string;
      };
      params: {
        playlistId?: string;
        trackId?: string;
      };
    }
  }
}

/**
 * Handles streaming audio from a YouTube URL.
 * @param req The Express request object.
 * @param res The Express response object.
 */
export const streamAudio = async (req: Request, res: Response) => {
  const youtubeUrl = req.query.url;

  if (typeof youtubeUrl !== 'string') {
    return res.status(400).json({ message: 'YouTube URL must be a string.' });
  }

  // Simple validation for YouTube URL
  const youtubeRegex = /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/;
  if (!youtubeRegex.test(youtubeUrl)) {
    return res.status(400).json({ message: 'Invalid YouTube URL.' });
  }

  try {
    const audioStream = await getAudioStream(youtubeUrl);
    res.setHeader('Content-Type', 'audio/mpeg'); // Assuming MPEG audio
    audioStream.pipe(res);
    audioStream.on('error', (err) => {
      loggerError('Stream error:', err);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Stream error' });
      }
    });
  } catch (error: any) {
    loggerError(error.message);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Handles adding a track to the database.
 * @param req The Express request object.
 * @param res The Express response object.
 */
export const addTrack = async (req: Request<{}, {}, AddTrackRequestBody>, res: Response) => {
  const { youtubeUrl, playlistId } = req.body;

  if (!youtubeUrl || !playlistId) {
    return res.status(400).json({ message: 'YouTube URL and Playlist ID are required.' });
  }

  try {
    const info = await ytStream.getInfo(youtubeUrl);

    const track = await Track.create({
      youtubeUrl,
      title: info.title || 'Unknown Title',
      duration: parseInt(String(info.duration || '0')),
      playlistId,
    });

    res.status(201).json(track);
  } catch (error: any) {
    loggerError('Error adding track:', error);
    res.status(500).json({ message: 'Error adding track.' });
  }
};

/**
 * Handles retrieving all tracks in a playlist.
 * @param req The Express request object.
 * @param res The Express response object.
 */
export const getTracksByPlaylist = async (req: Request, res: Response) => {
  const playlistId = req.params.playlistId ? parseInt(req.params.playlistId) : undefined;

  if (!playlistId) {
    return res.status(400).json({ message: 'Playlist ID is required.' });
  }

  try {
    const tracks = await Track.findByPlaylistId(playlistId);
    res.status(200).json(tracks);
  } catch (error: any) {
    loggerError('Error fetching tracks:', error);
    res.status(500).json({ message: 'Error fetching tracks.' });
  }
};

/**
 * Handles deleting a track by its ID.
 * @param req The Express request object.
 * @param res The Express response object.
 */
export const deleteTrack = async (req: Request, res: Response) => {
  const trackId = req.params.trackId ? parseInt(req.params.trackId) : undefined;

  if (!trackId) {
    return res.status(400).json({ message: 'Track ID is required.' });
  }

  try {
    const result = await Track.deleteById(trackId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Track not found.' });
    }
    res.status(204).send();
  } catch (error: any) {
    loggerError('Error deleting track:', error);
    res.status(500).json({ message: 'Error deleting track.' });
  }
};

/**
 * Handles streaming audio from a track ID.
 * @param req The Express request object.
 * @param res The Express response object.
 */
export const streamAudioFromTrackId = async (req: Request, res: Response) => {
  const trackId = req.params.trackId;

  if (!trackId) {
    return res.status(400).json({ message: 'Track ID is required.' });
  }

  try {
    const track = await Track.findById(parseInt(trackId));

    if (!track) {
      return res.status(404).json({ message: 'Track not found.' });
    }

    const youtubeUrl = track.youtube_url;

    const audioStream = await getAudioStream(youtubeUrl);
    res.setHeader('Content-Type', 'audio/mpeg'); // Assuming MPEG audio
    audioStream.pipe(res);
    audioStream.on('error', (err) => {
      loggerError('Stream error:', err);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Stream error' });
      }
    });
  } catch (error: any) {
    loggerError(error.message);
    res.status(500).json({ message: error.message });
  }
};