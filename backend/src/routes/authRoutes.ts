import express from 'express';
import * as authController from '../controllers/authController'; // Assuming authController.ts is available

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google-auth', authController.googleAuth);
router.post('/logout', authController.logout);

export default router;
