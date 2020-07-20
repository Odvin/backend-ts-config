import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import logger from '../../logger';

import { jwtConfig, adminCredentials } from '../../config';
import { AuthUserDto, UserTokenPayload } from './interfaces';

import usersRepository, {
  UsersRepository
} from '../../databases/postgres/repositories/users.repository';

const { secret, expired } = jwtConfig;

export class AuthProvider {
  constructor(
    private readonly secret: string,
    private readonly expired: string,
    private usersRepository: UsersRepository
  ) {}

  authorizeTokenService(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, payload) => {
        if (err) {
          reject(err);
        }
        resolve(payload);
      });
    });
  }

  private createTokenService(
    payload: UserTokenPayload,
    expiresIn: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.secret, { expiresIn }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  }

  async createPasswordHash(password: string): Promise<string> {
    const SALT_ROUNDS = 10;

    return bcrypt.hash(password, SALT_ROUNDS);
  }

  private async validatePassword(
    authUserDto: AuthUserDto,
    hashedPassword: string
  ): Promise<boolean> {
    const { password: plainPassword } = authUserDto;

    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async createUserToken(authUserDto: AuthUserDto): Promise<string | null> {
    if (
      authUserDto.password === adminCredentials.password &&
      authUserDto.email === adminCredentials.email
    ) {
      logger.info('System admin has received token');

      return this.createTokenService(
        {
          id: 0,
          name: 'Admin',
          role: 'admin'
        },
        this.expired
      );
    }

    const user = await this.usersRepository.getUserByEmail(authUserDto.email);

    if (!user) return null;

    const isPasswordValid = await this.validatePassword(
      authUserDto,
      user.password
    );

    if (!isPasswordValid) return null;

    return this.createTokenService(
      {
        id: user.id,
        name: user.name,
        role: user.role
      },
      this.expired
    );
  }
}

export default new AuthProvider(secret, expired, usersRepository);
