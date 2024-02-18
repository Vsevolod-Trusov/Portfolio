import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  /*const httpsOptions = {
    key: fs.readFileSync('D:\\Univer\\3курс\\2сем\\Node\\CourseProject\\HotelBackEnd\\backend\\application\\src\\https\\LAB.KEY'),
    cert: fs.readFileSync('D:\\Univer\\3курс\\2сем\\Node\\CourseProject\\HotelBackEnd\\backend\\application\\src\\https\\LAB.crt')
  }*/
  const app = await NestFactory.create(AppModule/* , {httpsOptions}*/);
  app.enableCors();
  await app.listen(3000);

}
bootstrap();
