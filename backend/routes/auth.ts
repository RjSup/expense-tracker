// -> controller to fetch user-specific data
import { Router } from 'express';
import { signupController, loginController } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { validateAuth } from '../middleware/validateMiddleware';
import { dashboardController } from '../controllers/dashboardController';

const router = Router();

router.post('/signup', validateAuth, signupController);
router.post('/login', validateAuth, loginController);

router.get('/dashboard', protect, dashboardController);

export default router;
