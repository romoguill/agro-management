import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import { validate } from '../middlewares/requestValidation';
import { RequestCreateUser } from '../schemas/user.schemas';
import { validateObjectId } from '../middlewares/validateObjectId';

const router = Router();

router.post('/', validate(RequestCreateUser), UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', validateObjectId, UserController.getUserById);

export default router;
