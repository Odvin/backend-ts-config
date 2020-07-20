import { Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import createError from 'http-errors';

export default function validateReq(
  req: Request,
  errorCode: number,
  message: string,
  next: NextFunction
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      createError(errorCode, message, {
        errors: errors.array()
      })
    );
  }
}
