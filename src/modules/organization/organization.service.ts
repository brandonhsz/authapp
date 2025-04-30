import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}
  async create(createOrganizationDto: CreateOrganizationDto) {
    const newOrganization = this.organizationRepository.create(
      createOrganizationDto,
    );
    await this.organizationRepository.save(newOrganization);
    return 'Organization created successfully';
  }

  async findAll() {
    return await this.organizationRepository.find();
  }

  async findOne(id: string) {
    return await this.organizationRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    await this.organizationRepository.update(id, updateOrganizationDto);
    return `This action updates a ${id} organization`;
  }

  remove(id: string) {
    return `This action removes a #${id} organization`;
  }
}
