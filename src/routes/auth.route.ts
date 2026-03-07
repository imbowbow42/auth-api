import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', authMiddleware, authController.login);
router.post('/register', authMiddleware, authController.register);

export default router;
