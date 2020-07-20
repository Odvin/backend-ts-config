import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import express, { Request, Response, NextFunction } from 'express';

import { getConnection } from 'typeorm';

import { serviceName, port } from '../../config';

const router = express.Router();

const swaggerDocument = YAML.load(`${__dirname}/swagger.yaml`);

swaggerDocument.servers[0].url = `http://localhost:${port}/api/v1`;

function liveness(req: Request, res: Response, next: NextFunction) {
  try {
    return res.sendStatus(200);
  } catch (e) {
    return next(e);
  }
}

function readiness(req: Request, res: Response, next: NextFunction) {
  try {
    const postgresDB = getConnection();

    if (postgresDB.isConnected) {
      return res.sendStatus(200);
    }

    return res.sendStatus(503);
  } catch (e) {
    return next(e);
  }
}

function serviceInfo(req: Request, res: Response, next: NextFunction) {
  try {
    return res.send(serviceName);
  } catch (e) {
    return next(e);
  }
}

router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.get('/api/v1/healthcheck/liveness', liveness);
router.get('/api/v1/healthcheck/readiness', readiness);

router.use('/', serviceInfo);

export default router;
