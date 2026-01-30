import express from 'express';
import * as userController from '../controllers/userController.js';
import {
  createUserValidation,
  updateUserValidation
} from '../validations/userValidation.js';

const router = express.Router();

router.post('/', createUserValidation, userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', updateUserValidation, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
