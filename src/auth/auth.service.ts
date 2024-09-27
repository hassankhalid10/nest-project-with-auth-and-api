import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {  //function for signup 
    const { name, email, password } = signUpDto;
    console.log(signUpDto)

    const hashedPassword = await bcrypt.hash(password, 10);     //pasword hashing

    const user = await this.userModel.create({      //create user
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });  //generate token 
    console.log(token)

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {   //login
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });       //find user by email

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);  //compare passwrd

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });     //generate token 

    return { token };
  }
}