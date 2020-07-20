import request from 'supertest';

import app from '../../app';

import { createConnection, getConnection } from 'typeorm';

import { postgresTestConfig, adminCredentials } from '../../config';
import { User } from '../../databases/postgres/entities/user.entity';

let userToken = 'Undefined';

beforeAll(async () => {
  await createConnection({
    name: 'default',
    type: 'postgres',
    ...postgresTestConfig,
    entities: [User]
  });
});

afterAll(async () => {
  const connection = getConnection();
  if (connection && connection.isConnected) {
    await connection.close();
  }
});

describe('Users :: CRUD operation', () => {
  test('Receive token for the system admin', async () => {
    const credentials = await request(app).post('/api/v1/auth/login').send({
      email: adminCredentials.email,
      password: adminCredentials.password
    });
    expect(credentials.status).toBe(200);
    expect(credentials.body).toHaveProperty('token');

    userToken = credentials.body.token;
  });
});
