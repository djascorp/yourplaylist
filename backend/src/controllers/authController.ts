import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';
import User from '../models/User'; // Assuming User.ts is available
import { generateToken } from '../utils/auth'; // Assuming auth.ts is available

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Interface for the request body of the register endpoint.
 */
interface RegisterRequestBody {
  username?: string;
  email: string;
  password?: string;
}

/**
 * Interface for the request body of the login endpoint.
 */
interface LoginRequestBody {
  email: string;
  password?: string;
}

/**
 * Interface for the request body of the Google authentication endpoint.
 */
interface GoogleAuthRequestBody {
  tokenId: string;
}

// Register with email/username
/**
 * Handles user registration with email and password.
 * @param req The Express request object.
 * @param res The Express response object.
 */
export const register = async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Username, email and password are required.' });
  }

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserId = await User.create(email, hashedPassword, username);
    const newUser = await User.findById(newUserId);

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
/**
 * Handles user login with email and password.
 * @param req The Express request object.
 * @param res The Express response object.
 */
export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { email, password } = req.body;

  console.log('Login attempt for email:', email);
  console.log('Provided password:', password);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findByEmail(email);
    console.log('User found by email:', user);

    if (!user || !user.password) {
      console.log('User not found or password missing.');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('Password does not match.');
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
/**
 * Handles user authentication via Google OAuth2.
 * @param req The Express request object.
 * @param res The Express response object.
 */
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
    const username = name || email; // Use name from payload, or email as fallback

    let user = await User.findByEmail(email);
    if (!user) {
      const hashedPassword = await bcrypt.hash(email + (process.env.JWT_SECRET as string), 10);
      const newUserId = await User.create(email, hashedPassword, username);
      // After creating, fetch the user again to get the UserWithPassword object
      user = await User.findByEmail(email); // Fetch the created user again
      if (!user) { // This check should ideally not be needed if create and findByEmail work
        return res.status(500).json({ message: 'Failed to retrieve newly created user via Google Auth.' });
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
/**
 * Handles user logout.
 * @param req The Express request object.
 * @param res The Express response object.
 */
export const logout = (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
};