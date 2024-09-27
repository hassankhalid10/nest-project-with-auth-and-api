import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {   //this is used in authorization with usegaurd
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({                                                     //invoke jwt strategy in super function with token and secret
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //extract token from header
      secretOrKey: process.env.JWT_SECRET,                      //jwt secret
    });
  }

  async validate(payload) {       //validate paylaod
    const { id } = payload;

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }

    return user;
  }
}