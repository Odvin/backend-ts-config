import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import logger from '../../logger';

interface ResponseError extends Error {
  status?: number;
  errors?: any;
}

function unhandled(req: Request, res: Response, next: NextFunction) {
  next(createError(404, 'Unhandled router'));
}

function handler(
  error: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!error.status) {
    logger.error('Internal Server Error', error);
  }

  res.status(error.status || 500);

  const response = {
    status: error.status || 500,
    message: error.message,
    errors: error.errors?.length ? error.errors : []
  };

  res.json(response);
}

export default { unhandled, handler };
