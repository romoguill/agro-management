import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import { validate } from '../middlewares/requestValidation';
import { RequestCreateUser } from '../schemas/user.schemas';

const router = Router();

router.post('/signup', validate(RequestCreateUser), UserController.signUp);

router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

export default router;
