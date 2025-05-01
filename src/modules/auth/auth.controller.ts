import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }

  @Post('register')
  async register(@Body() createTenantDto: CreateTenantDto) {
    return this.authService.register(createTenantDto);
  }
}
