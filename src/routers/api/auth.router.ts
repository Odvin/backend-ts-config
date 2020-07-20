import express from 'express';
import { body } from 'express-validator';

const router = express.Router();

import authController from '../../controllers/auth';

router.post(
  '/login',
  [
    body('email').exists().isEmail(),
    body('password').exists().isString().isLength({ min: 5, max: 20 })
  ],
  authController.createUserToken
);

export default router;
