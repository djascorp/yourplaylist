import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Pool } from 'mysql2/promise';
import db from '../config/db';

/**
 * Interface for data required to create a track.
 */
interface TrackData {
  youtubeUrl: string;
  title: string;
  duration: number;
  playlistId: number;
}

/**
 * Represents a track row from the database.
 */
interface TrackRow extends RowDataPacket {
  id: number;
  youtube_url: string;
  title: string;
  duration: number;
  playlist_id: number;
  added_by: number;
}

/**
 * Manages track-related database operations.
 */
class Track {
  /**
   * Creates a new track in the database.
   * @param trackData The track data (youtubeUrl, title, duration, playlistId).
   * @returns The result of the insert operation.
   */
  static async create({ youtubeUrl, title, duration, playlistId }: TrackData): Promise<ResultSetHeader> {
    const [result] = await (db as Pool).query<ResultSetHeader>(
      'INSERT INTO tracks (youtube_url, title, duration, playlist_id) VALUES (?, ?, ?, ?)',
      [youtubeUrl, title, duration, playlistId]
    );
    return result;
  }

  /**
   * Finds a track by its ID.
   * @param id The ID of the track.
   * @returns The track row if found, otherwise undefined.
   */
  static async findById(id: number): Promise<TrackRow | undefined> {
    const [rows] = await (db as Pool).query<TrackRow[]>('SELECT * FROM tracks WHERE id = ?', [id]);
    return rows[0];
  }

  /**
   * Finds tracks by playlist ID.
   * @param playlistId The ID of the playlist.
   * @returns A list of track rows.
   */
  static async findByPlaylistId(playlistId: number): Promise<TrackRow[]> {
    const [rows] = await (db as Pool).query<TrackRow[]>('SELECT * FROM tracks WHERE playlist_id = ?', [playlistId]);
    return rows;
  }

  /**
   * Deletes a track by its ID.
   * @param id The ID of the track to delete.
   * @returns The result of the delete operation.
   */
  static async deleteById(id: number): Promise<ResultSetHeader> {
    console.log("ID TRACK", id);
    const [result] = await (db as Pool).query<ResultSetHeader>('DELETE FROM tracks WHERE id = ?', [id]);
    return result;
  }
}

export default Track;