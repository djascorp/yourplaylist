import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Pool } from 'mysql2/promise';
import db from '../config/db';

/**
 * Interface for data required to create a playlist.
 */
interface PlaylistData {
  name: string;
  ownerId: number;
}

/**
 * Interface for data required to add a track.
 */
interface TrackData {
  youtube_url: string;
  title: string;
  duration: number;
  addedBy: number;
}

/**
 * Represents a playlist row from the database, potentially including username from a join.
 */
interface PlaylistRow extends RowDataPacket {
  id: number;
  name: string;
  owner_id: number;
  username?: string; // Joined from users table
}

/**
 * Manages playlist-related database operations.
 */
class Playlist {
  /**
   * Creates a new playlist in the database.
   * @param data The playlist data (name and ownerId).
   * @returns The result of the insert operation.
   */
  static async create({ name, ownerId }: PlaylistData): Promise<ResultSetHeader> {
    const [result] = await (db as Pool).query<ResultSetHeader>(
      'INSERT INTO playlists (name, owner_id) VALUES (?, ?)',
      [name, ownerId]
    );
    return result;
  }

  /**
   * Retrieves all playlists, optionally filtered by owner ID.
   * @param ownerId The ID of the owner (optional).
   * @returns A list of playlist rows.
   */
  static async findAll(ownerId: number | null = null): Promise<PlaylistRow[]> {
    try {
      let query = 'SELECT playlists.*, users.username FROM playlists left join users on users.id = playlists.owner_id';
      const params: (string | number)[] = [];

      if (ownerId) {
        query += ' WHERE owner_id = ?';
        params.push(ownerId);
      }

      const [playlists] = await (db as Pool).query<PlaylistRow[]>(query, params);
      return playlists;
    } catch (error) {
      console.error('Erreur dans le modèle Playlist:', error);
      throw error;
    }
  }

  /**
   * Finds a playlist by its ID.
   * @param id The ID of the playlist.
   * @returns The playlist row if found, otherwise undefined.
   */
  static async findById(id: number): Promise<PlaylistRow | undefined> {
    const [rows] = await (db as Pool).query<PlaylistRow[]>('SELECT playlists.*, users.username FROM playlists left join users on users.id = playlists.owner_id WHERE playlists.id = ?', [id]);
    return rows[0];
  }

  /**
   * Adds a track to a specific playlist.
   * @param playlistId The ID of the playlist to add the track to.
   * @param trackData The data of the track to add. (youtube_url, title, duration, addedBy)
   * @returns The result of the insert operation.
   */
  static async addTrack(playlistId: number, { youtube_url, title, duration, addedBy }: TrackData): Promise<ResultSetHeader> {
    const [result] = await (db as Pool).query<ResultSetHeader>(
      'INSERT INTO tracks (youtube_url, title, duration, playlist_id, added_by) VALUES (?, ?, ?, ?, ?)',
      [youtube_url, title, duration, playlistId, addedBy]
    );
    return result;
  }

  /**
   * Deletes a playlist by its ID.
   * @param id The ID of the playlist to delete.
   * @returns The result of the delete operation.
   */
  static async deleteById(id: number): Promise<ResultSetHeader> {
    const [result] = await (db as Pool).query<ResultSetHeader>('DELETE FROM playlists WHERE id = ?', [id]);
    return result;
  }
}

export default Playlist;