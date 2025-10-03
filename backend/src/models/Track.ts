import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Pool } from 'mysql2/promise';
import db from '../config/db';

interface TrackData {
  youtubeUrl: string;
  title: string;
  duration: number;
  playlistId: number;
}

interface TrackRow extends RowDataPacket {
  id: number;
  youtube_url: string;
  title: string;
  duration: number;
  playlist_id: number;
  added_by: number;
}

class Track {
  static async create({ youtubeUrl, title, duration, playlistId }: TrackData): Promise<ResultSetHeader> {
    const [result] = await (db as Pool).query<ResultSetHeader>(
      'INSERT INTO tracks (youtube_url, title, duration, playlist_id) VALUES (?, ?, ?, ?)',
      [youtubeUrl, title, duration, playlistId]
    );
    return result;
  }

  static async findById(id: number): Promise<TrackRow | undefined> {
    const [rows] = await (db as Pool).query<TrackRow[]>('SELECT * FROM tracks WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByPlaylistId(playlistId: number): Promise<TrackRow[]> {
    const [rows] = await (db as Pool).query<TrackRow[]>('SELECT * FROM tracks WHERE playlist_id = ?', [playlistId]);
    return rows;
  }

  static async deleteById(id: number): Promise<ResultSetHeader> {
    console.log("ID TRACK", id);
    const [result] = await (db as Pool).query<ResultSetHeader>('DELETE FROM tracks WHERE id = ?', [id]);
    return result;
  }
}

export default Track;
