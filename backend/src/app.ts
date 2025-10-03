import dotenv from 'dotenv';
// Load environment variables
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';

import playlistRoutes from './routes/playlistRoutes';
import trackRoutes from './routes/trackRoutes';
import authRoutes from './routes/authRoutes';

/**
 * Initializes the Express application.
 */
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/playlists', playlistRoutes); // Playlist routes
app.use('/api/tracks', trackRoutes); // Track routes
app.use('/api/auth', authRoutes); // Authentication routes

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to YouPlaylist! 🎶');
});

// Start the server only if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;