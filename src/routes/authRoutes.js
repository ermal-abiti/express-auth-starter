import express from 'express';
import { register, login, getLoggedUser } from '../controllers/authController.js';
import { userRegisterValidator, userLoginValidator } from '../validators/userValidator.js';
import { authGuard } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/register', userRegisterValidator, register);
router.post('/login', userLoginValidator, login);
router.get('/me', authGuard, getLoggedUser);


export default router;