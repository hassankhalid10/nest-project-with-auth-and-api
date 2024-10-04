import { Body, Controller, Get, Post } from '@nestjs/common'; // Import necessary decorators and modules from NestJS
import { AuthService } from './auth.service'; // Import the AuthService for handling authentication logic
import { LoginDto } from './dto/login.dto'; // Import the DTO for login data validation
import { SignUpDto } from './dto/signup.dto'; // Import the DTO for signup data validation

@Controller('auth') // Define a controller for handling authentication-related routes
export class AuthController {
  constructor(private authService: AuthService) {} // Inject AuthService into the controller

  @Post('/signup') // Define a POST route for user signup
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {  // Accept signup data as SignUpDto
    console.log("signup succeed"); // Log a message indicating signup success
    return this.authService.signUp(signUpDto); // Call the signUp method in AuthService with the DTO
  }

  @Get('/login') // Define a GET route for user login
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {  // Accept login data as LoginDto
    console.log("login succeed"); // Log a message indicating login success
    return this.authService.login(loginDto); // Call the login method in AuthService with the DTO
  }
}


//routes
//get  http://localhost:3000/auth/login
//post  http://localhost:3000/auth/signup

