import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'jwt_secret_key';

export interface AuthRequest extends Request {
  user?: { id: number }; // JWT payload
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Not authorized, no token' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    req.user = decoded; // attach user info to request
    next();
  } catch (err: any) {
    res.status(401).json({ message: err.message || 'Not authorized, token failed' });
  }
};
