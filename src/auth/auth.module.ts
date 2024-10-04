import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserSchema } from './schemas/user.schema';

// Define the AuthModule
@Module({
  imports: [
    // Register Passport module with JWT strategy as the default
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // Configure and register JWT module asynchronously
    JwtModule.registerAsync({
      inject: [ConfigService], // Inject ConfigService to access environment variables
      useFactory: (config: ConfigService) => {
        return {
          // Retrieve secret and expiration time from configuration
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'), // Set token expiration
          },
        };
      },
    }),

    // Register Mongoose module for User schema
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), 
  ],
  controllers: [AuthController], // Register the AuthController
  providers: [AuthService, JwtStrategy], // Register AuthService and JwtStrategy as providers
  exports: [JwtStrategy, PassportModule], // Export JwtStrategy and PassportModule for use in other modules
})
export class AuthModule {}
