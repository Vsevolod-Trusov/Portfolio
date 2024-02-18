import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Image } from '../src/frameworks/data-services/mongo/models/image.model';
import { UserInput } from '../src/frameworks/graphQL-service/dto/user/user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('it should be create user', () => {

    let user: UserInput = new UserInput();
    user.login = 'seva';
    user.password = 'test5';
    user.role = 'user';
    user.email = 'seva@mail.ru';
    user.subscribedOnNews = true;
    user.avatar = new Image('test/path');

    let json = JSON.stringify(user);

    return request(app.getHttpServer())
      .post('/api/user')
      .set('Content-Type', 'application/json')
      .send(json)
      .expect(201);
  });

  it('it should be return 403', () => {

    let user: UserInput = new UserInput();
    user.login = 'seva';
    user.password = 'test5';
    user.role = 'user';
    user.email = 'seva@mail.ru';
    user.subscribedOnNews = true;
    user.avatar = new Image('test/path');

    let json = JSON.stringify(user);

    return request(app.getHttpServer())
      .post('/api/user')
      .set('Content-Type', 'application/json')
      .send(json)
      .expect(403);
  });


  //example e2e test for resolver+db
  it('should create a new user', async () => {

    let createUserInput = new UserInput();
    createUserInput.login = 'seva_via_test223';
    createUserInput.role = 'user';
    createUserInput.email = 'seva2002@mail.ru';
    createUserInput.avatar = new Image('image/test');
    createUserInput.password = 'seva_2002';
    createUserInput.subscribedOnNews = true;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
            mutation ($user: CreateUserInput!){
                createUser(createUser: $user) {
                 login,
                 email,
                 avatar{
                   imagePath
                 },
                 subscribedOnNews
              }
            }
          `,
        variables: {
          user: createUserInput
        }
      }).expect(200)
    console.log(response.body)
    const createdExample = response.body.data.createUser;
    expect(createdExample.login).toEqual(createUserInput.login);

  });

  return;
});
