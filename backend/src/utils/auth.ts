import jwt from 'jsonwebtoken';

/**
 * Interface for the user payload stored in the JWT.
 */
interface UserPayload {
  id: number;
  email: string;
  // Add other user properties that might be in the JWT payload
}

/**
 * Generates a JSON Web Token (JWT) for a given user.
 * @param user The user payload to be signed into the token.
 * @param remember Whether the token should have a longer expiration (7 days) or default (3 hours).
 * @returns The generated JWT string.
 */
const generateToken = (user: UserPayload, remember: boolean = false): string => {
  return jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: !remember ? '3h' : '7d'
  });
};

export { generateToken };