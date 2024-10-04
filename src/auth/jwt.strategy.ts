import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './schemas/user.schema';

@Injectable() // Marks the class as a provider that can be injected
export class JwtStrategy extends PassportStrategy(Strategy) { // Extends Passport's JWT strategy for authentication
  constructor(
    @InjectModel(User.name) // Injects the User model to interact with the database
    private userModel: Model<User>, // Defines the user model type
  ) {
    super({ // Calls the constructor of the base class (PassportStrategy)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracts JWT token from the Authorization header
      secretOrKey: process.env.JWT_SECRET, // Uses the secret key from environment variables to verify tokens
    });
  }

  async validate(payload) { // Validates the JWT payload after extraction
    const { id } = payload; // Destructures the user ID from the JWT payload

    const user = await this.userModel.findById(id); // Looks up the user by ID in the database

    if (!user) { // Checks if the user does not exist
      throw new UnauthorizedException('Login first to access this endpoint.'); // Throws an error if the user is not found
    }

    return user; // Returns the user object if validation is successful
  }
}
