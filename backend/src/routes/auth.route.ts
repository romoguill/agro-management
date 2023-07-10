import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { validate } from '../middlewares/requestValidation';
import { RequestRegisterUser } from '../schemas/user.schemas';

const router = Router();

router.post(
  '/register',
  validate(RequestRegisterUser),
  AuthController.register
);

export default router;
