import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {                        //main file to bootrap changes and run app
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
