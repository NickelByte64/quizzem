import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { TenantModel } from 'src/tenant/model/tenant.model';
import { Repository } from 'typeorm';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantModel)
    private readonly tenantRepository: Repository<TenantModel>,
  ) {}

  async getTenantByUserId(userId: UUID): Promise<TenantModel | null> {
    const tenant = await this.tenantRepository
      .createQueryBuilder('tenant')
      .select()
      .where('user.id = :id', { userId })
      .getOne();

    if (!tenant) {
      throw new NotFoundException(`Tenant with id: ${userId} not found`);
    }

    return tenant;
  }
}
