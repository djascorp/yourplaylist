# **YourPlaylist**

YourPlaylist is a collaborative playlist management web application. Create playlists, share them with others, and enjoy audio-only playback of YouTube videos.

---

## **Features**
- **Create and Manage Playlists**: Easily create and manage your playlists.
- **Share Playlists**: Share your playlists with a unique link.
- **Collaborative Playlists**: Anyone with the link can add YouTube videos.
- **Audio-Only Mode**: Listen to YouTube videos without the video content.
- **Autoplay**: Playlists are played automatically in sequence.

---

## **Technologies**
- **Frontend**: React.native
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Audio Streaming**: `yt-stream`
- **Authentication**: JWT (JSON Web Tokens), Google
- **Deployment**: Docker, Heroku, or AWS

---

## **Development Principles**
This project adheres to the following core development principles:
- **Architectural Separation**: Clear separation between frontend (React Native Expo) and backend (Node.js).
- **Code Quality & Maintainability**: Commitment to established coding standards, documentation, and modular design.
- **Test-Driven Development (TDD)**: Emphasis on automated testing (unit, integration, E2E) to ensure correctness and prevent regressions.

---

## **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/djascorp/yourplaylist.git
   cd yourplaylist
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Create a MySQL database and update the configuration in `config/db.js`.
   - Run the SQL scripts to create the necessary tables.

4. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=yourplaylist
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the application**:
   ```bash
   npm start
   ```

6. **Access the application**:
   Open your browser and go to `http://localhost:3000`.

---

## **TypeScript Development (Backend)**

The backend is developed using TypeScript. Here's how to work with it:

1.  **Build the TypeScript code**:
    ```bash
    npm run build --prefix backend
    ```
    This compiles the TypeScript files from `backend/src` into JavaScript files in `backend/dist`.

2.  **Run the compiled application**:
    ```bash
    npm start --prefix backend
    ```
    This starts the application using the compiled JavaScript code.

3.  **Run in development mode (with hot-reloading)**:
    ```bash
    npm run dev --prefix backend
    ```
    This uses `nodemon` and `ts-node` to automatically recompile and restart the server on code changes.

4.  **Run tests**:
    ```bash
    npm test --prefix backend
    ```

---

## **API Endpoints**

### **Playlists**
- **Create a Playlist**: `POST /playlists`
- **Get a Playlist**: `GET /playlists/:id`
- **Add a Track to a Playlist**: `POST /playlists/:id/tracks`

### **Tracks**
- **Stream Audio**: `GET /stream?url=YOUTUBE_URL`

---

## **Folder Structure**
```
yourplaylist/
├── config/                  # Configuration files
├── controllers/             # Route controllers
├── models/                  # Database models
├── routes/                  # API routes
├── services/                # Business logic
├── utils/                   # Utility functions
├── middlewares/             # Middleware functions
├── .env                     # Environment variables
├── app.js                   # Main application file
└── package.json             # Node.js dependencies
```

---

## **Contributing**

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Contact**

For any questions or feedback, please contact:
- **Your Name**  
- **Email**: djasniveyrajaona@gmail.com  
- **GitHub**: [djascorp](https://github.com/djascorp)

---

Enjoy creating and sharing playlists with **YourPlaylist**! 🎶