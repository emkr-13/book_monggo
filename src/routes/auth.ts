import { Router } from 'express';
import { login } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);



export default router;