import usersRepository, {
  UsersRepository
} from '../../databases/postgres/repositories/users.repository';

import { UserFilterDto, CreateUserDto, UpdateUserDto } from './interfaces';

export class UsersProvider {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUser(userId, updateUserDto);
  }

  async getUsers(userFilterDto: UserFilterDto) {
    return this.usersRepository.getUsers(userFilterDto);
  }

  async deleteUser(userId: number) {
    return this.usersRepository.deleteUser(userId);
  }
}

export default new UsersProvider(usersRepository);
