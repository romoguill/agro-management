import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import { validate } from '../middlewares/requestValidation';
import { RequestCreateUser, RequestUpdateUser } from '../schemas/user.schemas';
import { validateObjectId } from '../middlewares/validateObjectId';

const router = Router();

router.post('/', validate(RequestCreateUser), UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', validateObjectId, UserController.getUserById);
router.patch(
  '/:id',
  validateObjectId,
  validate(RequestUpdateUser),
  UserController.updateUser
);
router.delete('/:id', validateObjectId, UserController.deleteUser);

export default router;
