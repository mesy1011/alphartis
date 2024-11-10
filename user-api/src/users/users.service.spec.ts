import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return all users', () => {
    const users = service.getAllUsers();
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThan(0);
  });

  it('should return a user by ID', () => {
    const user = service.getUserById(1);
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
  });

  it('should throw NotFoundException for a non-existing user', () => {
    expect(() => service.getUserById(999)).toThrow(NotFoundException);
  });

  it('should throw InternalServerErrorException if file cannot be read', () => {
    service['usersFilePath'] = 'invalid-path.json';
    expect(() => service.getAllUsers()).toThrow(InternalServerErrorException);
  });
});