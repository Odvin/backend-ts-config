import { createConnection } from 'typeorm';
import { Courses } from './postgres/entities/courses.entity';

import { postgresConfig } from '../config';

createConnection({
  type: 'postgres',
  ...postgresConfig,
  entities: [Courses]
});
