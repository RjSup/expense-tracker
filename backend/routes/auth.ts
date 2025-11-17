// -> controller to fetch user-specific data
import { Router } from 'express';
import { signupController, loginController } from '../controllers/authController';
import { protect, AuthRequest } from '../middleware/authMiddleware';
import prisma from '../prisma/client';
import { validateAuth } from '../middleware/validateMiddleware';

const router = Router();

router.post('/signup', validateAuth, signupController);
router.post('/login', validateAuth, loginController);

router.get('/dashboard', protect, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    res.json({ message: `Hello ${user?.name}, welcome to your dashboard` });
  } catch {
    res.status(500).json({ message: 'Failed to fetch dashboard' });
  }
});


export default router;
