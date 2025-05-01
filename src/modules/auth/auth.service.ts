import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { ApiService } from '../api/api.service';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly apiService: ApiService,
    private readonly jwtService: JwtService,
  ) {}

  async login(signInDto: SignInDto) {
    const session = await this.apiService.post(
      `/tenants/${process.env.USERFRONT_WORKSPACE_ID}/auth/password`,
      {
        emailOrUsername: signInDto.email,
        password: signInDto.password,
      },
    );
    return session;
  }

  async register(createTenantDto: CreateTenantDto) {
    const { tenantId } = await this.apiService.post(
      `/tenants/${process.env.USERFRONT_WORKSPACE_ID}/tenants`,
      {
        name: createTenantDto.enterpriseName,
      },
    );
    await this.apiService.post(`/tenants/${tenantId}/users`, {
      email: createTenantDto.userEmail,
      password: createTenantDto.userPassword,
      name: `${createTenantDto.userNames} ${createTenantDto.userLastNames}`,
    });

    return 'User created successfully';
  }

  async verify(token: string) {
    try {
      const cleanedToken = token.replace(/^Bearer\s/, '');

      const { userUuid } = this.jwtService.verify(cleanedToken, {
        publicKey: process.env.USERFRONT_JWT_PUBLIC_KEY,
      });
      return await this.apiService.get(
        `/tenants/${process.env.USERFRONT_WORKSPACE_ID}/users/${userUuid}`,
      );
    } catch {
      return 'Token verification failed';
    }
  }
}
