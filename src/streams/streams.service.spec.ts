import { Test, TestingModule } from '@nestjs/testing';
import { StreamsService } from './streams.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { Stream } from './schema/streams.schema';

describe('StreamsService', () => {
  let service: StreamsService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StreamsService,
        {
          provide: UserService,
          useValue: {
            userById: jest.fn(),
          },
        },
        {
          provide: getModelToken(Stream.name),
          useValue: {
            countCurrentStreamsByUserId: jest.fn(),
            newStream: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StreamsService>(StreamsService);
    userService = module.get <UserService>(UserService);
  });

  it('should add a new stream if the user limit has not been reached', async () => {
    const userMock = {
      _id: '0001',
      streams_limit: 2,
      username: 'Teste 01',
      created_date: new Date(),
    };
    jest.spyOn(userService, 'userById').mockResolvedValue(userMock);
    jest.spyOn(service, 'countCurrentStreamsByUserId').mockResolvedValue(1);

    const result = await service.newStream('0001');
    expect(result.user_id).toEqual(userMock._id);
    expect(result).toHaveProperty('start_time');
    expect(result).toHaveProperty('end_time');
  });
});
