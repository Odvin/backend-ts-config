import { port, serviceName } from './config';
import app from './app';
import logger from './logger';
import './databases';
import './storage/mongo';

app
  .listen(port, () =>
    logger.info(`🚀 :: ${serviceName} is running on port :: ${port}`)
  )
  .on('error', (e) => logger.error(e));
