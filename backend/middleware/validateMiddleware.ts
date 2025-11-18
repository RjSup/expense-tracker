import { Request, Response, NextFunction } from 'express';

export const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  // Ensure req.body exists
  if (!req.body) {
    console.log('Error - Missing request body');
    return res.status(400).json({ message: 'Request body is missing' });
  }

  const { name, email, password } = req.body;

  // For signup: name is required
  if (req.path.includes('/signup') && !name) {
    console.log('Error - Missing name');
    return res.status(400).json({ message: 'Name is required' });
  }

  if (!email || !password) {
    console.log('Error - Missing email or password');
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.log('Error - Invalid email format');
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (password.length < 6) {
    console.log('Error - Password too short');
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  console.log('Validation passed');
  next();
};
