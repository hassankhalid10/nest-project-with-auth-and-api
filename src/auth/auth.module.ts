import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserSchema } from './schemas/user.schema';

@Module({                       
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),    //import passport js and use jwt strategy
    JwtModule.registerAsync({                             //import jwt module
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'), 
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),    //import moongoose with schema
  ],
  controllers: [AuthController],              //import controller
  providers: [AuthService, JwtStrategy],    //import services
  exports: [JwtStrategy, PassportModule],   //export modules
})
export class AuthModule {}