import { Router } from 'express';
import UserModel from '../models/userModel';
import * as UserController from '../controllers/userController';
import { validate } from '../middlewares/requestValidation';
import { createUserPayload } from '../schemas/userSchemas';

const router = Router();

router.post('/signup', validate(createUserPayload), UserController.signUp);

router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

export default router;
