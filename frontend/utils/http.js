export const BASE_URL = 'http://127.0.0.1:3000';

const DEFAULT_HEADER = {
    "Content-Type": "application/json",
};

/**
 * Gère les erreurs de réponse HTTP.
 * @param {Response} response - La réponse HTTP.
 * @returns {Promise} - Retourne la réponse si elle est réussie, sinon lance une erreur.
 */
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
    }
    return response.json();
};

/**
 * Encode les paramètres de requête pour les requêtes GET.
 * @param {Object} params - Les paramètres de requête.
 * @returns {string} - Les paramètres encodés sous forme de chaîne de requête.
 */
const encodeQueryParams = (params) => {
    if (!params) return "";
    return "?" + new URLSearchParams(params).toString();
};

export const http = {
    BASE_URL: BASE_URL,
    /**
     * Effectue une requête POST.
     * @param {string} url - L'URL de l'endpoint.
     * @param {Object?} data - Les données à envoyer.
     * @param {Object?} headers - Les headers personnalisés.
     * @returns {Promise} - Les données JSON de la réponse.
     */
    post: async (url, data, headers = {}) => {
        const response = await fetch(`${BASE_URL}/${url}`, {
            method: "POST",
            headers: { ...DEFAULT_HEADER, ...headers },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    /**
     * Effectue une requête GET.
     * @param {string} url - L'URL de l'endpoint.
     * @param {Object?} params - Les paramètres de requête.
     * @param {Object?} headers - Les headers personnalisés.
     * @returns {Promise} - Les données JSON de la réponse.
     */
    get: async (url, params = {}, headers = {}) => {
        const queryString = encodeQueryParams(params);
        const response = await fetch(`${BASE_URL}/${url}${queryString}`, {
            method: "GET",
            headers: { ...DEFAULT_HEADER, ...headers },
        });
        return handleResponse(response);
    },

    /**
     * Effectue une requête PUT.
     * @param {string} url - L'URL de l'endpoint.
     * @param {Object} data - Les données à envoyer.
     * @param {Object} headers - Les headers personnalisés.
     * @returns {Promise} - Les données JSON de la réponse.
     */
    put: async (url, data, headers = {}) => {
        const response = await fetch(`${BASE_URL}/${url}`, {
            method: "PUT",
            headers: { ...DEFAULT_HEADER, ...headers },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    /**
     * Effectue une requête PATCH.
     * @param {string} url - L'URL de l'endpoint.
     * @param {Object} data - Les données à envoyer.
     * @param {Object} headers - Les headers personnalisés.
     * @returns {Promise} - Les données JSON de la réponse.
     */
    patch: async (url, data, headers = {}) => {
        const response = await fetch(`${BASE_URL}/${url}`, {
            method: "PATCH",
            headers: { ...DEFAULT_HEADER, ...headers },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    /**
     * Effectue une requête DELETE.
     * @param {string} url - L'URL de l'endpoint.
     * @param {Object} headers - Les headers personnalisés.
     * @returns {Promise} - Les données JSON de la réponse.
     */
    delete: async (url, headers = {}) => {
        const response = await fetch(`${BASE_URL}/${url}`, {
            method: "DELETE",
            headers: { ...DEFAULT_HEADER, ...headers },
        });
        return handleResponse(response);
    },
};

