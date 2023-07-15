import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { validate } from '../middlewares/requestValidation';
import { RequestLoginUser, RequestRegisterUser } from '../schemas/user.schemas';

const router = Router();

router.post(
  '/register',
  validate(RequestRegisterUser),
  AuthController.register
);

router.post('/login', validate(RequestLoginUser), AuthController.login);
router.post('/refresh', AuthController.refreshAccessToken);

export default router;
