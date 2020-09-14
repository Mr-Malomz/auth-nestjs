import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { UserJwtResponse } from './interface/user-jwt-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<string> {
    return this.authService.signUp(authSignUpDto);
  }

  @Post('/signin')
  async signIn(@Body() authSignInDto: AuthSignInDto): Promise<UserJwtResponse> {
    return this.authService.signIn(authSignInDto);
  }
}
