import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return all users', () => {
    const users = controller.getAllUsers();
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThan(0);
  });

  it('should return a user by ID', () => {
    const user = controller.getUserById(1);
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
  });

  it('should throw NotFoundException if user is not found', () => {
    jest.spyOn(service, 'getUserById').mockImplementation(() => {
      throw new NotFoundException();
    });
    expect(() => controller.getUserById(999)).toThrow(NotFoundException);
  });
});