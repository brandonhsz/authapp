import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return 'login';
  }

  @Post('register')
  async register(@Body() createTenantDto: CreateTenantDto) {
    return this.authService.register(createTenantDto);
  }
}
