import { Request, Response, NextFunction } from 'express';

export const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  // Ensure req.body exists
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is missing' });
  }

  const { name, email, password } = req.body;

  // For signup: name is required
  if (req.path.includes('/signup') && !name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  console.log('Validation passed');
  next();
};
