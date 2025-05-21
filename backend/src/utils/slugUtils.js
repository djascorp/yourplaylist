// backend/src/utils/slugUtils.js
import { nanoid } from 'nanoid'; // Assume nanoid can be imported after installation

const SLUG_LENGTH = 10; // Or your preferred length

/**
 * Generates a unique, URL-friendly slug.
 * Note: True uniqueness check against the database (e.g., by querying the playlists table) 
 * should ideally be handled by the calling service or controller. If a collision 
 * is detected (which is rare with nanoid's default length and alphabet), 
 * this function may need to be called again until a unique slug is found.
 * @returns {string} A generated slug.
 */
export function generateSlug() {
  return nanoid(SLUG_LENGTH);
}
