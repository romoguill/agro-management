import { Router } from 'express';
import UserModel from '../models/userModel';
import * as UserController from '../controllers/userController';

const router = Router();

router.post('/signup', UserController.signUp);

router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

export default router;
