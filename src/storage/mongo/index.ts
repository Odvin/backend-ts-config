import mongoose from 'mongoose';
import logger from '../../logger';

import { mongoDbInfo, environment } from '../../config';

const mongoConnectionPath = `mongodb://${mongoDbInfo.user}:${mongoDbInfo.password}@${mongoDbInfo.host}:${mongoDbInfo.port}/${mongoDbInfo.database}`;

const connectionOptions =
  environment === 'development'
    ? {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        autoIndex: true,
        authSource: 'admin',
        poolSize: 10,
        bufferMaxEntries: 0,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000
      }
    : undefined;

mongoose.connect(mongoConnectionPath, connectionOptions);

mongoose.connection.on('connected', () => {
  logger.info(`Mongoose connected with pid :: ${process.pid}`);
});

mongoose.connection.on('error', (e) => {
  logger.error('Mongoose connection ERROR ::', e);
});

mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});

export default mongoose.connection;
