import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { ApiService } from '../api/api.service';

@Module({
  imports: [],
  providers: [AuthService, JwtService, ApiService],
  controllers: [AuthController],
})
export class AuthModule {}
