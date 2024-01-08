import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { signUpDto } from './dto/signup.dto';
import { User } from './schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async signUp(signUpDto: signUpDto): Promise<{ token: string, user: Omit<User, 'password'> }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { password: T, ...user } = await this.userModel.create({ // T is an alias to password.
      name,
      email,
      password: hashedPassword,
    }).then((res: any) => res?._doc || res);

    const token = this.jwtService.sign({ ...user });

    return { user, token };
  }

  async login(LoginDto: LoginDto): Promise<{ token: string, user: Omit<User, 'password'> }> {
    const { email, password } = LoginDto;

    const user_res = await this.userModel.findOne({
      email
    }).then((res: any) => res?._doc || res);

    if (!user_res) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordmatched = await bcrypt.compare(password, user_res.password);

    if (!isPasswordmatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: T, ...user } = user_res;

    const token = this.jwtService.sign({ id: user._id });

    return { token, user };
  }

  async currentUser(token: string): Promise<{ user: Omit<User, 'password'> }> {

    const user = this.jwtService.verify<Omit<User, 'password'>>(token);

    return { user };
  }
}
