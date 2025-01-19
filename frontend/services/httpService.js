import { http } from "../utils/http";

export const httpService = {
    user: {
        /**
         * Connecte un utilisateur.
         * @param {Object} credentials - Les informations de connexion.
         * @param {string} credentials.email - L'email de l'utilisateur.
         * @param {string} credentials.password - Le mot de passe de l'utilisateur.
         * @returns {Promise} - Les données de l'utilisateur connecté.
         */
        login: async ({ email, password }) => {
            return await http.post('api/auth/login', { email, password });
        },

        /**
         * Enregistre un nouvel utilisateur.
         * @param {Object} data - Les données de l'utilisateur.
         * @param {string} data.username - Le nom d'utilisateur.
         * @param {string} data.email - L'email de l'utilisateur.
         * @param {string} data.password - Le mot de passe de l'utilisateur.
         * @returns {Promise} - Les données de l'utilisateur enregistré.
         */
        register: async (data = {}) => {
            return await http.post('api/auth/register', data);
        },

        /**
         * Récupère les informations de l'utilisateur connecté.
         * @returns {Promise} - Les données de l'utilisateur.
         */
        getProfile: async () => {
            return await http.get('api/user/profile');
        },

        /**
         * Met à jour les informations de l'utilisateur.
         * @param {Object} data - Les nouvelles données de l'utilisateur.
         * @param {string} data.username - Le nouveau nom d'utilisateur.
         * @param {string} data.email - Le nouvel email de l'utilisateur.
         * @param {string} data.password - Le nouveau mot de passe de l'utilisateur.
         * @returns {Promise} - Les données mises à jour de l'utilisateur.
         */
        updateProfile: async (data = {}) => {
            return await http.put('api/user/profile', data);
        },

        /**
         * Déconnecte l'utilisateur.
         * @returns {Promise} - Un message de succès.
         */
        logout: async () => {
            return await http.post('api/auth/logout');
        },
    },

    playlist: {
        /**
         * Récupère la liste des playlists de l'utilisateur.
         * @returns {Promise} - La liste des playlists.
         */
        getAll: async () => {
            return await http.get('api/playlists');
        },

        /**
         * Récupère les détails d'une playlist spécifique.
         * @param {number} playlistId - L'ID de la playlist.
         * @returns {Promise} - Les détails de la playlist.
         */
        getById: async (playlistId) => {
            return await http.get(`api/playlists/${playlistId}`);
        },

        /**
         * Crée une nouvelle playlist.
         * @param {Object} data - Les données de la playlist.
         * @param {string} data.name - Le nom de la playlist.
         * @returns {Promise} - Les données de la playlist créée.
         */
        create: async (data = {}) => {
            return await http.post('api/playlists', data);
        },

        /**
         * Met à jour une playlist existante.
         * @param {number} playlistId - L'ID de la playlist.
         * @param {Object} data - Les nouvelles données de la playlist.
         * @param {string} data.name - Le nouveau nom de la playlist.
         * @returns {Promise} - Les données mises à jour de la playlist.
         */
        update: async (playlistId, data = {}) => {
            return await http.put(`api/playlists/${playlistId}`, data);
        },

        /**
         * Supprime une playlist.
         * @param {number} playlistId - L'ID de la playlist.
         * @returns {Promise} - Un message de succès.
         */
        delete: async (playlistId) => {
            return await http.delete(`api/playlists/${playlistId}`);
        },

        /**
         * Ajoute une piste à une playlist.
         * @param {number} playlistId - L'ID de la playlist.
         * @param {Object} trackData - Les données de la piste.
         * @param {string} trackData.youtube_url - Le lien YouTube de la piste.
         * @returns {Promise} - Les données de la piste ajoutée.
         */
        addTrack: async (playlistId, trackData = {}) => {
            return await http.post(`api/playlists/${playlistId}/tracks`, trackData);
        },

        /**
         * Supprime une piste d'une playlist.
         * @param {number} playlistId - L'ID de la playlist.
         * @param {string} trackId - L'ID de la piste.
         * @returns {Promise} - Un message de succès.
         */
        removeTrack: async (playlistId, trackId) => {
            return await http.delete(`api/playlists/${playlistId}/tracks/${trackId}`);
        },

        /**
         * Recuperer la liste des tracks dans un playlist
         * @param {number} playlistId - L'ID de la playlist.
         */
        getTracks :async (playlistId) => {
            return await http.get(`api/playlists/${playlistId}/tracks`);
        }
    },

    track: {
        /**
         * Récupère les informations détaillées d'une piste.
         * @param {string} trackId - L'ID de la piste.
         * @returns {Promise} - Les détails de la piste.
         */
        getDetails: async (trackId) => {
            return await http.get(`api/tracks/${trackId}`);
        },
    },
};