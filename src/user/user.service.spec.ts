import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schema/user.schema';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const userModelMock = {
      findOne: jest.fn(),
      save: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: jest.fn(() => userModelMock),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });
  it('should throw error if username already exists', () => {
    jest.spyOn(userModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue({
        username: 'teste_01',
        streams_limit: 2,
        created_date: new Date(),
      }),
    } as any);
    expect(service.register('teste_01', 2)).rejects.toThrow(
      'Username already exists',
    );
  });

  it('should throw error if streams_limit is 0 or negative', () => {
    expect(service.register('teste_01', 0)).rejects.toThrow(
      'streamsLimit must be a positive number',
    );
  });
});
