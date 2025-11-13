import { Request, Response } from 'express';
import prisma from '../prisma/client';
import bcrypt from 'bcrypt';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'jwt_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// JWT payload interface
interface JwtPayload {
  id: number;
}

// Generate JWT token
export const generateToken = (userId: number): string => {
  const payload: JwtPayload = { id: userId };
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as any };
  return jwt.sign(payload, JWT_SECRET, options);
};

// Signup controller
export const signupController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = generateToken(user.id);
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Login controller
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};