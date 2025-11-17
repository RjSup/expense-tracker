import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import prisma from '../prisma/client';
import { User } from '../types/user';

export const dashboardController = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: 'Unauthorized' });

    const user: User | null = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user)
      return res.status(404).json({ message: 'User not found' });

    res.json({
      message: `Hello ${user.name}, welcome to your dashboard`,
      user,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch dashboard';
    res.status(500).json({ message: msg });
  }
};
