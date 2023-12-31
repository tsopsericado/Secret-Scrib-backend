import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  async signUp(@Body() signUpDto: signUpDto): Promise<{ token: string }> {
    const user_and_token = await this.authService.signUp(signUpDto);

    return user_and_token
  }

  @Post('/login')
  async login(@Body() LoginDto: LoginDto): Promise<{ token: string }> {
    const user_and_token = await this.authService.login(LoginDto);

    console.log({ user_and_token });
    return user_and_token;
  }

  @Get('/current-user')
  async getCurrentUser(@Headers('authorization') authorization: string): Promise<{ user: Omit<User, 'password'> }> {
    const token = authorization.split(' ').pop();

    const res = await this.authService.currentUser(token);
    return { user: res.user }
  }
}
