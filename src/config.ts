export const environment = process.env.NODE_ENV;
export const serviceName = process.env.SERVICE_NAME || 'Ongradient-API-Server';
export const port = parseInt(process.env.API_SERVER_PORT || '4000');
export const corsUrl = process.env.CORS_URL || '*';

export const routerLog = {
  active: Boolean(process.env.ROUTER_LOG_ACTIVATION || false),
  format: process.env.ROUTER_LOG_FORMAT || 'tiny'
};

export const consoleLog = {
  format: process.env.CONSOLE_LOG_FORMAT || 'plain',
  level: process.env.CONSOLE_LOG_LEVEL || 'error'
};

export const postgresConfig = {
  host: process.env.POSTGRES_HOST || 'postgres-db',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'ongradientKeeper',
  password: process.env.POSTGRES_PASSWORD || 'dbKeeper!Auth',
  database: process.env.POSTGRES_DB || 'ongradient',
  synchronize: Boolean(process.env.POSTGRES_SYNC)
};

// ---------

export const environment = process.env.NODE_ENV || 'development';

export const serviceName = process.env.SERVICE_NAME || 'Ongradient-API-Server';

export const port = parseInt(process.env.PORT || '4000');

export const corsUrl = process.env.CORS_URL || '*';

export const routerLog = {
  active: Boolean(process.env.ROUTER_LOG_ACTIVATION || false),
  format: process.env.ROUTER_LOG_FORMAT || 'tiny'
};

export const consoleLog = {
  format: process.env.CONSOLE_LOG_FORMAT || 'plain',
  level: process.env.CONSOLE_LOG_LEVEL || 'error'
};

export const mongoDbInfo = {
  database: process.env.DB_NAME || 'ongradient',
  host: process.env.MONGO_HOST || 'ongradient-mongo-db',
  port: process.env.MONGO_PORT || '27017',
  user: process.env.DB_USER || 'teacher',
  password: process.env.DB_USER_PWD || 'teacherPassword'
};
