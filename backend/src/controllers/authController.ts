import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';
import User from '../models/User'; // Assuming User.ts is available
import { generateToken } from '../utils/auth'; // Assuming auth.ts is available

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface RegisterRequestBody {
  username?: string;
  email: string;
  password?: string;
}

interface LoginRequestBody {
  email: string;
  password?: string;
}

interface GoogleAuthRequestBody {
  tokenId: string;
}

// Register with email/username
export const register = async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Assuming User.create can handle optional username or generate one
    const newUserId = await User.create(email, hashedPassword);
    const newUser = await User.findById(newUserId); // Fetch the created user to get all properties

    if (!newUser) {
      return res.status(500).json({ message: 'Failed to create user.' });
    }

    const token = generateToken({ id: newUser.id, email: newUser.email });
    res.status(201).json({ token });
  } catch (err) {
    console.error('Error in register:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login with email/username
export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findByEmail(email);
    if (!user || !user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Authenticate with Google
export const googleAuth = async (req: Request<{}, {}, GoogleAuthRequestBody>, res: Response) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ message: 'Invalid Google token payload.' });
    }

    const { email, name } = payload;

    let user = await User.findByEmail(email);
    if (!user) {
      const hashedPassword = await bcrypt.hash(email + (process.env.JWT_SECRET as string), 10);
      const newUserId = await User.create(email, hashedPassword);
      user = await User.findById(newUserId); // Fetch the created user to get all properties
      if (!user) {
        return res.status(500).json({ message: 'Failed to create user via Google Auth.' });
      }
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
  } catch (err) {
    console.error('Error in googleAuth:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout
export const logout = (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
};
