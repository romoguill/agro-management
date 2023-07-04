import { Router } from 'express';
import * as UserController from '../controllers/userController';
import { validate } from '../middlewares/requestValidation';
import { RequestCreateUser } from '../schemas/userSchemas';

const router = Router();

router.post('/signup', validate(RequestCreateUser), UserController.signUp);

router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

export default router;
