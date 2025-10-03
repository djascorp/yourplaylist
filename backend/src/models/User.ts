import { RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import db from '../config/db';

interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  password?: string; // Password might not be selected in all queries
}

class User {
  static async create(email: string, password: string): Promise<number> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await (db as Pool).query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
    return (result as any).insertId; // TODO: Type result properly
  }

  static async findByEmail(email: string): Promise<UserRow | undefined> {
    const [rows] = await (db as Pool).query<UserRow[]>('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id: number): Promise<UserRow | undefined> {
    const [rows] = await (db as Pool).query<UserRow[]>('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
}

export default User;
