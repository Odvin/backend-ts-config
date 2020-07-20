export const environment = process.env.NODE_ENV;
export const serviceName = process.env.SERVICE_NAME || 'SLots-BO-API-Server';
export const port = parseInt(process.env.API_SERVER_PORT || '4000');
export const corsUrl = process.env.CORS_URL || '*';

export const adminCredentials = {
  email: process.env.ADMIN_EMAIL || 'admin@mydigicode.com',
  password: process.env.ADMIN_PASSWORD || 'StrongPassw0rd'
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'SomeSecret!',
  expired: process.env.JWT_EXPIRES || '3h'
};

export const routerLog = {
  active: Boolean(process.env.ROUTER_LOG_ACTIVATION || false),
  format: process.env.ROUTER_LOG_FORMAT || 'tiny'
};

export const parserOptions = {
  json: { limit: '10mb' },
  urlencoded: {
    limit: '10mb',
    extended: true,
    parameterLimit: 50000
  }
};

export const consoleLog = {
  format: process.env.CONSOLE_LOG_FORMAT || 'plain',
  level: process.env.CONSOLE_LOG_LEVEL || 'error'
};

export const postgresConfig = {
  host: process.env.POSTGRES_HOST || 'slots-postgres-db',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'dbAdmin',
  password: process.env.POSTGRES_PASSWORD || 'dbAdminPassword',
  database: process.env.POSTGRES_DB || 'slots-bo',
  synchronize: Boolean(process.env.POSTGRES_SYNC || false)
};

export const postgresTestConfig = {
  host: 'slots-postgres-db',
  port: 5432,
  username: 'dbAdmin',
  password: 'dbAdminPassword',
  database: 'slots-bo',
  synchronize: true
};

export const mongoConfig = {
  database: process.env.DB_NAME || 'slots-bo',
  host: process.env.MONGO_HOST || 'slots-mongo-db',
  port: process.env.MONGO_PORT || '27017',
  user: process.env.DB_USER || 'dbAdmin',
  password: process.env.DB_USER_PWD || 'dbAdminPassword'
};
