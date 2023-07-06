import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import { validate } from '../middlewares/requestValidation';
import { RequestCreateUser } from '../schemas/user.schemas';

const router = Router();

router.post('/', validate(RequestCreateUser), UserController.createUser);
router.get('/', UserController.getAllUsers);

export default router;
