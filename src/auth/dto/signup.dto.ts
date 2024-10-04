import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// Data Transfer Object (DTO) for user sign-up
export class SignUpDto {
  // Name of the user; must not be empty and should be a string
  @IsNotEmpty() 
  @IsString()
  readonly name: string;

  // User's email; must not be empty and must be a valid email format
  @IsNotEmpty() 
  @IsEmail({}, { message: 'Please enter correct email' }) 
  readonly email: string;

  // User's password; must not be empty, should be a string, and must have a minimum length of 6 characters
  @IsNotEmpty() 
  @IsString() 
  @MinLength(6) 
  readonly password: string;
}
