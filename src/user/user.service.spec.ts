import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schema/user.schema';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should register new user on success', () => {
    const newUser = service.register('teste_01', 2);

    expect(newUser).toHaveProperty('username', 'teste_01');
    expect(newUser).toHaveProperty('streams_limit', 2);
    expect(newUser).toHaveProperty('created_date');
  });

  it('should throw error if username already exists', () => {
    jest.spyOn(userModel, 'findOne').mockResolvedValue({
      username: 'teste_01',
      streams_limit: 2,
      created_date: new Date(),
    });

    expect(service.register('teste_01', 2)).toThrow('Username already exists');
  });

  it('should throw error if streams_limit is 0 or negative', () => {
    expect(service.register('teste_01', 0)).toThrow(
      'streamsLimit must be a positive number',
    );
  });
});
