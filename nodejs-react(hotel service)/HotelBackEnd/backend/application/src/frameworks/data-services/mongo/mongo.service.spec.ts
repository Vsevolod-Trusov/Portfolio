/*
import { Test, TestingModule } from '@nestjs/testing';
import { MongoDataService } from './mongo-data-service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './models/user.model';
import { User} from '../../../core/entities/user.entity';
import { Room, RoomSchema } from './models/room.model';
import { Logger } from '@nestjs/common';
// @ts-ignore
import * as bcrypt from 'bcrypt';
import { Image } from './models/image.model';

describe('TestService', () => {
  let service: MongoDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        MongooseModule.forFeature([
          {name: User.name, schema: UserSchema},
          {name: Room.name, schema: RoomSchema}
        ]),
        MongooseModule.forRoot('mongodb://localhost:27017/hotel'),
      ],
      providers: [MongoDataService]
    }).compile();

    service = module.get<MongoDataService>(MongoDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array', async () => {
    service.onApplicationBootstrap()
    let users = await service.users.getAll()
    const logger = new Logger('test')
    for (let user of users) {
      logger.log(`${user}`)
      for (let field in user) {
        logger.warn(`${field}: ${user[field]}`)
      }
    }
    expect(users.length).toBeGreaterThan(0);
  });

  it('should insert user', async () => {
    service.onApplicationBootstrap()

    let user: User = new User();
    user.login = 'vsevolod';
    user.password = await bcrypt.hash('Seva2002', 10);
    user.role = 'admin';
    user.email = 'vsevolod_trusov_00@mail.ru';
    user.avatar = new Image('test/path')
    user.subscribedOnNews = true;

    await service.users.create(<UserDocument>user)
    let val = true
    expect(val).toBe(true);
  });


  it('should insert user', async () => {
    service.onApplicationBootstrap()

    let user: User = new User();
    user.login = 'seva33555';
    user.password = await bcrypt.hash('test5', 10);
    user.role = 'user';
    user.email = 'seva@mail.ru';
    user.subscribedOnNews = true;

    await service.users.create(<UserDocument>user)
    let val = true
    expect(val).toBe(true);
  });
});
*/
