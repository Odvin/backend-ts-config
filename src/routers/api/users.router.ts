import express from 'express';
import { body, query } from 'express-validator';

const router = express.Router();

import authController from '../../controllers/auth';
import usersController from '../../controllers/users';

const USER_ROLES = ['admin', 'partner', 'inspector'];

router.get(
  '/',
  authController.validateToken,
  authController.validateAdminRole,
  [
    query('name').optional().isString().isLength({ min: 3, max: 20 }),
    query('role').optional().isIn(USER_ROLES)
  ],
  usersController.getUsers
);

router.post(
  '/',
  authController.validateToken,
  authController.validateAdminRole,
  [
    body('email').exists().isEmail(),
    body('password').exists().isString().isLength({ min: 8, max: 20 }),
    body('name').exists().isString().isLength({ min: 3, max: 150 }),
    body('role').exists().isIn(USER_ROLES),
    body('isActive').exists().isBoolean()
  ],
  usersController.createUser
);

router.patch(
  '/',
  authController.validateToken,
  authController.validatePartnerRole,
  [
    query('id').exists().isInt(),
    body('email').optional().isEmail(),
    body('password').optional().isString().isLength({ min: 8, max: 20 }),
    body('name').optional().isString().isLength({ min: 3, max: 150 })
  ],
  usersController.updateUser
);

router.delete(
  '/',
  authController.validateToken,
  authController.validateAdminRole,
  [query('id').exists().isInt()],
  usersController.deleteUser
);

export default router;
