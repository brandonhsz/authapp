import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { ApiService } from '../api/api.service';

@Injectable()
export class AuthService {
  constructor(private readonly apiService: ApiService) {}

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
}
