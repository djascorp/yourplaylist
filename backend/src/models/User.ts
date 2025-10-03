import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { Pool } from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import db from '../config/db';

/**
 * Represents a user in the database.
 */
export interface UserRow extends RowDataPacket {
  id: number;
  email: string;
  username: string;
}

/**
 * Represents a user row from the database including the password.
 */
export interface UserWithPassword extends UserRow {
  password: string;
}

/**
 * Manages user-related database operations.
 */
class User {
  /**
   * Creates a new user in the database.
   * @param email The user's email address.
   * @param hashedPassword The user's hashed password.
   * @param username The user's username.
   * @returns The ID of the newly created user.
   */
  static async create(email: string, hashedPassword: string, username: string): Promise<number> {
    const [result] = await (db as Pool).query<ResultSetHeader>(
      'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
      [email, hashedPassword, username]
    );
    return result.insertId;
  }

  /**
   * Finds a user by their email address.
   * @param email The user's email address.
   * @returns The user row with password if found, otherwise undefined.
   */
  static async findByEmail(email: string): Promise<UserWithPassword | undefined> {
    const [rows] = await (db as Pool).query<UserWithPassword[]>('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  /**
   * Finds a user by their ID.
   * @param id The user's ID.
   * @returns The user row if found, otherwise undefined.
   */
  static async findById(id: number): Promise<UserRow | undefined> {
    const [rows] = await (db as Pool).query<UserRow[]>('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  /**
   * Compares a candidate password with a hashed password.
   * @param candidatePassword The plain text password to compare.
   * @param hashedPassword The hashed password from the database.
   * @returns True if the passwords match, otherwise false.
   */
  static async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
}

export default User;
