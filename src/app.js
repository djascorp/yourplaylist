const dotenv = require('dotenv');
// Load environment variables
dotenv.config();

const express = require('express');
const cors = require('cors');

const playlistRoutes = require('./routes/playlistRoutes');
const trackRoutes = require('./routes/trackRoutes');
// const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/playlists', playlistRoutes); // Playlist routes
app.use('/api/tracks', trackRoutes); // Track routes
// app.use('/api/auth', authRoutes); // Authentication routes

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to YouPlaylist! 🎶');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;