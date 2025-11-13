import { Router } from 'express';
import { signupController, loginController } from '../controllers/authController';
import { validateAuth } from '../middleware/validateMiddleware';
// import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.post('/signup', validateAuth, signupController);
router.post('/login', validateAuth, loginController);

export default router;
