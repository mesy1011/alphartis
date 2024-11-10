import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UsersService {
  private usersFilePath = join(__dirname, 'users.json');

  getAllUsers() {
    try {
      const data = readFileSync(this.usersFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new InternalServerErrorException('Could not load users data');
    }
  }

  getUserById(id: number) {
    const users = this.getAllUsers();
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
