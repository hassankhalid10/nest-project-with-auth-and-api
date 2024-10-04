import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import { JwtService } from '@nestjs/jwt'; // Import JwtService for token generation
import { SignUpDto } from './dto/signup.dto'; // Import DTOs for signup
import { LoginDto } from './dto/login.dto'; // Import DTOs for login

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) // Inject the User model
    private userModel: Model<User>,
    private jwtService: JwtService, // Inject the JWT service
  ) {}

  // Function to handle user signup
  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto; // Destructure properties from the DTO
    console.log(signUpDto); // Log the signup data for debugging

    // Hash the user's password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Generate a JWT token for the new user
    const token = this.jwtService.sign({ id: user._id });
    console.log(token); // Log the generated token for debugging

    // Return the token as part of the response
    return { token };
  }

  // Function to handle user login
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto; // Destructure properties from the DTO

    // Find a user by email in the database
    const user = await this.userModel.findOne({ email });

    // If no user is found, throw an unauthorized exception
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    // If the passwords do not match, throw an unauthorized exception
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate a JWT token for the logged-in user
    const token = this.jwtService.sign({ id: user._id });

    // Return the token as part of the response
    return { token };
  }
}
