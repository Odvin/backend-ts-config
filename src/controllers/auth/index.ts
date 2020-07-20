import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import validateReq from '../validator';
import authProvider from './provider';

import { AuthUserDto, UserTokenPayload } from './interfaces';

async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { authorization = 'Is empty' } = req.headers;
    const [, token] = authorization.split(' ');

    const tokenPayload = await authProvider.authorizeTokenService(token);
    res.locals.token = tokenPayload;

    return next();
  } catch (e) {
    res.set('WWW-Authenticate', 'Bearer');
    return next(createError(401, 'Authentication required.'));
  }
}

async function createUserToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    validateReq(req, 422, 'Incorrect AuthUserDto', next);

    const authUserDto: AuthUserDto = req.body;

    const token = await authProvider.createUserToken(authUserDto);

    if (!token) {
      return next(createError(401, 'Invalid service password. Access denied.'));
    }

    return res.json({ token });
  } catch (e) {
    return next(e);
  }
}

async function validateAdminRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user: UserTokenPayload = res.locals.token;

    if (user.role !== 'admin') {
      return next(
        createError(403, 'Credentials that are not adequate to gain access')
      );
    }

    return next();
  } catch (e) {
    return next(e);
  }
}

async function validatePartnerRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user: UserTokenPayload = res.locals.token;

    if (!['admin', 'partner'].includes(user.role)) {
      return next(
        createError(403, 'Credentials that are not adequate to gain access')
      );
    }

    return next();
  } catch (e) {
    return next(e);
  }
}

export default {
  validateToken,
  validateAdminRole,
  validatePartnerRole,
  createUserToken
};
