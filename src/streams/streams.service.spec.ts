import { Test, TestingModule } from '@nestjs/testing';
import { StreamsService } from './streams.service';
import { UserService } from '../user/user.service';

describe('StreamsService', () => {
  let service: StreamsService;
  let userService: UserService;

  const userMock = {
    _id: '0001',
    streams_limit: 2,
    username: 'Teste 01',
    created_date: new Date(),
  };

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
      ],
    }).compile();

    service = module.get<StreamsService>(StreamsService);
    userService = module.get<UserService>(UserService);
  });

  it('should add a new stream if the user limit has not been reached', async () => {
    jest.spyOn(userService, 'userById').mockResolvedValue(userMock);
    jest.spyOn(service, 'countCurrentStreamsByUserId').mockResolvedValue(1);

    const result = await service.newStream('0001');
    expect(result.user_id).toEqual(userMock._id);
    expect(result).toHaveProperty('start_time');
    expect(result).toHaveProperty('end_time');
  });
  it('should throw an error if user stream limit was reached', async () => {
    jest.spyOn(userService, 'userById').mockResolvedValue(userMock);
    jest.spyOn(service, 'countCurrentStreamsByUserId').mockResolvedValue(2);

    expect(service.newStream('0001')).toThrow('You have reached stream limit');
  });
});
