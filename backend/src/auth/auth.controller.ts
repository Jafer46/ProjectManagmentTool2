import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signupDto';
import { LoginDTO } from './dto/loginDTO';
import { RefreshDTO } from './dto/refreshDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') //auth/singup
  async singup(@Body() singupData: SignupDTO) {
    return this.authService.singup(singupData);
  }

  @Post('login') // auth/login
  async login(@Body() credentials: LoginDTO) {
    return this.authService.login(credentials);
  }

  @Post('refresh') //auth/refresh
  async refresh(@Body() refreshToken: RefreshDTO) {
    return this.authService.refreshTokens(refreshToken.refreshToken);
  }
}
