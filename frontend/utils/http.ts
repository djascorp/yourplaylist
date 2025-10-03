export const BASE_URL = 'http://127.0.0.1:3000';

const DEFAULT_HEADER = {
  "Content-Type": "application/json",
};

/**
 * Handles HTTP response errors.
 * @param response - The HTTP response.
 * @returns The response if successful, otherwise throws an error.
 */
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }
  return response.json();
};

/**
 * Encodes query parameters for GET requests.
 * @param params - The query parameters.
 * @returns The encoded parameters as a query string.
 */
const encodeQueryParams = (params: Record<string, any>): string => {
  if (!params) return "";
  return "?" + new URLSearchParams(params).toString();
};

export const http = {
  BASE_URL: BASE_URL,
  /**
   * Performs a POST request.
   * @param url - The endpoint URL.
   * @param data - The data to send.
   * @param headers - Custom headers.
   * @returns The JSON data from the response.
   */
  post: async <T>(url: string, data?: object, headers: Record<string, string> = {}): Promise<T> => {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "POST",
      headers: { ...DEFAULT_HEADER, ...headers },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },

  /**
   * Performs a GET request.
   * @param url - The endpoint URL.
   * @param params - The query parameters.
   * @param headers - Custom headers.
   * @returns The JSON data from the response.
   */
  get: async <T>(url: string, params: Record<string, any> = {}, headers: Record<string, string> = {}): Promise<T> => {
    const queryString = encodeQueryParams(params);
    const response = await fetch(`${BASE_URL}/${url}${queryString}`, {
      method: "GET",
      headers: { ...DEFAULT_HEADER, ...headers },
    });
    return handleResponse<T>(response);
  },

  /**
   * Performs a PUT request.
   * @param url - The endpoint URL.
   * @param data - The data to send.
   * @param headers - Custom headers.
   * @returns The JSON data from the response.
   */
  put: async <T>(url: string, data: object, headers: Record<string, string> = {}): Promise<T> => {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "PUT",
      headers: { ...DEFAULT_HEADER, ...headers },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },

  /**
   * Performs a PATCH request.
   * @param url - The endpoint URL.
   * @param data - The data to send.
   * @param headers - Custom headers.
   * @returns The JSON data from the response.
   */
  patch: async <T>(url: string, data: object, headers: Record<string, string> = {}): Promise<T> => {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "PATCH",
      headers: { ...DEFAULT_HEADER, ...headers },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },

  /**
   * Performs a DELETE request.
   * @param url - The endpoint URL.
   * @param headers - Custom headers.
   * @returns The JSON data from the response.
   */
  delete: async <T>(url: string, headers: Record<string, string> = {}): Promise<T> => {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "DELETE",
      headers: { ...DEFAULT_HEADER, ...headers },
    });
    return handleResponse<T>(response);
  },
};
