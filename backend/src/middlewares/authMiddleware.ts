import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Pool } from 'mysql2/promise';
import db from '../config/db';

interface DecodedToken {
  id: number;
  email: string;
  // Add other properties that might be in your JWT payload
}

interface UserRow {
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

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const AUTHORIZE_GUEST = process.env.AUTHORIZE_GUEST === 'true';

  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (AUTHORIZE_GUEST && !token) {
      req.user = { id: 1, username: 'Guest' }; // Assign a default guest user
      return next();
    }

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

    const [rows] = await (db as Pool).query<UserRow[]>('SELECT id, username FROM users WHERE id = ?', [decoded.id]);
    const user = rows[0];

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
