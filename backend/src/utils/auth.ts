import jwt from 'jsonwebtoken';

interface UserPayload {
  id: number;
  email: string;
  // Add other user properties that might be in the JWT payload
}

const generateToken = (user: UserPayload, remember: boolean = false): string => {
  return jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: !remember ? '3h' : '7d'
  });
};

export { generateToken };
