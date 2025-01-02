-- Table `users`
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Identifiant unique de l'utilisateur
    username VARCHAR(50) NOT NULL UNIQUE,       -- Nom d'utilisateur
    email VARCHAR(100) NOT NULL UNIQUE,         -- Adresse email
    password_hash VARCHAR(255) NOT NULL,        -- Mot de passe hashé
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date de création du compte
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date de mise à jour
);

-- Table `playlists`
CREATE TABLE playlists (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Identifiant unique de la playlist
    name VARCHAR(100) NOT NULL,                 -- Nom de la playlist
    owner_id INT NOT NULL,                      -- ID de l'utilisateur propriétaire
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date de création de la playlist
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date de mise à jour
);

-- Table `tracks`
CREATE TABLE tracks (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Identifiant unique de la piste
    youtube_url VARCHAR(255) NOT NULL,          -- URL YouTube de la vidéo
    title VARCHAR(255) NOT NULL,                -- Titre de la piste
    duration INT NOT NULL,                      -- Durée de la piste en secondes
    playlist_id INT NOT NULL,                   -- ID de la playlist associée
    added_by INT NOT NULL,                      -- ID de l'utilisateur qui a ajouté la piste
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date d'ajout de la piste
);

-- Table `sessions` (Optionnel)
CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Identifiant unique de la session
    user_id INT NOT NULL,                       -- ID de l'utilisateur
    token VARCHAR(255) NOT NULL,                -- Token de session (JWT)
    expires_at TIMESTAMP NOT NULL,              -- Date d'expiration du token
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date de création de la session
);

-- Table `collaborators` (Optionnel)
CREATE TABLE collaborators (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Identifiant unique de l'entrée
    playlist_id INT NOT NULL,                   -- ID de la playlist
    user_id INT NOT NULL,                       -- ID de l'utilisateur collaborateur
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date d'ajout du collaborateur
);

-- Table `playlist_history` (Optionnel)
CREATE TABLE playlist_history (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Identifiant unique de l'entrée
    playlist_id INT NOT NULL,                   -- ID de la playlist
    track_id INT NOT NULL,                      -- ID de la piste lue
    played_by INT NOT NULL,                     -- ID de l'utilisateur qui a lu la piste
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date de lecture
);

-- Table `notifications` (Optionnel)
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Identifiant unique de la notification
    user_id INT NOT NULL,                       -- ID de l'utilisateur
    message TEXT NOT NULL,                      -- Message de la notification
    is_read BOOLEAN DEFAULT FALSE,              -- Indique si la notification a été lue
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date de création de la notification
);

-- Table `settings` (Optionnel)
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Identifiant unique des paramètres
    user_id INT NOT NULL UNIQUE,                -- ID de l'utilisateur
    autoplay BOOLEAN DEFAULT TRUE,              -- Activer/désactiver l'autoplay
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date de création des paramètres
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Date de mise à jour
);