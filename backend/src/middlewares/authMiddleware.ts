import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Pool, RowDataPacket } from 'mysql2/promise';
import db from '../config/db';

/**
 * Interface for the decoded JWT token payload.
 */
interface DecodedToken {
  id: number;
  email: string;
  // Add other properties that might be in your JWT payload
}

/**
 * Represents a user row from the database, used for authentication.
 */
export interface UserRow extends RowDataPacket {
  id: number;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserRow; // Extend Request to include user property
    }
  }
}

/**
 * Middleware to authenticate users based on JWT.
 * Allows guest access if AUTHORIZE_GUEST is true and no token is provided.
 * Attaches user information to the request object if authentication is successful.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The next middleware function.
 */
const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const AUTHORIZE_GUEST = process.env.AUTHORIZE_GUEST === 'true';

  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (AUTHORIZE_GUEST && !token) {
      req.user = { id: 1, username: 'Guest' } as UserRow; // Assign a default guest user
      return next();
    }

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    const [rows] = await (db as Pool).query<RowDataPacket[]>('SELECT id, username FROM users WHERE id = ?', [decoded.id]);
    const user = (rows as UserRow[])[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export default authenticate;