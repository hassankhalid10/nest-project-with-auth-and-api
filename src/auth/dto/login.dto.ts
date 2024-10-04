import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// Data Transfer Object for user login
export class LoginDto {
  // Email field must not be empty and must be a valid email format
  @IsNotEmpty() 
  @IsEmail({}, { message: 'Please enter correct email' }) 
  readonly email: string;

  // Password field must not be empty, must be a string, and must be at least 6 characters long
  @IsNotEmpty() 
  @IsString() 
  @MinLength(6) 
  readonly password: string;
}
