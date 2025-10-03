import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Pool } from 'mysql2/promise';
import db from '../config/db';

interface PlaylistData {
  name: string;
  ownerId: number;
}

interface TrackData {
  youtube_url: string;
  title: string;
  duration: number;
  addedBy: number;
}

interface PlaylistRow extends RowDataPacket {
  id: number;
  name: string;
  owner_id: number;
  username?: string; // Joined from users table
}

class Playlist {
  static async create({ name, ownerId }: PlaylistData): Promise<ResultSetHeader> {
    const [result] = await (db as Pool).query<ResultSetHeader>(
      'INSERT INTO playlists (name, owner_id) VALUES (?, ?)',
      [name, ownerId]
    );
    return result;
  }

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

  static async findById(id: number): Promise<PlaylistRow | undefined> {
    const [rows] = await (db as Pool).query<PlaylistRow[]>('SELECT playlists.*, users.username FROM playlists left join users on users.id = playlists.owner_id WHERE playlists.id = ?', [id]);
    return rows[0];
  }

  static async addTrack(playlistId: number, { youtube_url, title, duration, addedBy }: TrackData): Promise<ResultSetHeader> {
    const [result] = await (db as Pool).query<ResultSetHeader>(
      'INSERT INTO tracks (youtube_url, title, duration, playlist_id, added_by) VALUES (?, ?, ?, ?, ?)',
      [youtube_url, title, duration, playlistId, addedBy]
    );
    return result;
  }

  static async deleteById(id: number): Promise<ResultSetHeader> {
    const [result] = await (db as Pool).query<ResultSetHeader>('DELETE FROM playlists WHERE id = ?', [id]);
    return result;
  }
}

export default Playlist;
