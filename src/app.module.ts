import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';


@Module({                              //import all modules auth , books , env ,mongoose and all controllers,services
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/library-next-api'),
    //MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
