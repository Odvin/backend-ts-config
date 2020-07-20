import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';

import logger from '../../../logger';
import {
  UserFilterDto,
  CreateUserDto,
  UpdateUserDto
} from '../../../controllers/users/interfaces';

export class UsersRepository {
  async createUser(
    createUserDto: CreateUserDto
  ): Promise<Omit<User, 'password'>> {
    logger.info(`New user with role ${createUserDto.role} has to be created`);

    const usersRepository = getRepository(User);
    const user = usersRepository.create(createUserDto);

    const { password, ...userInfo } = await usersRepository.save(user);
    return userInfo;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto
  ): Promise<{ affected: number | undefined }> {
    const usersRepository = getRepository(User);

    const { affected } = await usersRepository
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where('id = :userId', { userId })
      .execute();

    return { affected };
  }

  async deleteUser(
    userId: number
  ): Promise<{ affected: number | undefined | null }> {
    const usersRepository = getRepository(User);

    const {
      affected
    } = await usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :userId', { userId })
      .execute();

    return { affected };
  }

  async getUsers(userFilterDto: UserFilterDto): Promise<User[]> {
    const { role, name } = userFilterDto;

    const usersRepository = getRepository(User);

    const query = usersRepository.createQueryBuilder('user');

    if (role) {
      query.andWhere('user.role =:role', { role });
    }

    if (name) {
      query.andWhere('user.name LIKE :name', { name: `%${name}%` });
    }

    return query.getMany();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const usersRepository = getRepository(User);

    return usersRepository.findOne({ email, isActive: true });
  }

  async getUserById(userId: number): Promise<User | undefined> {
    const usersRepository = getRepository(User);

    return usersRepository.findOne(userId);
  }
}

export default new UsersRepository();
