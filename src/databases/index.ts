import { createConnection } from 'typeorm';

import { postgresConfig } from '../config';
import { User } from './postgres/entities/user.entity';

createConnection({
  name: 'default',
  type: 'postgres',
  ...postgresConfig,
  entities: [User]
});
