import { Injectable, Logger } from '@nestjs/common';
import { CategoryGroupModel } from 'src/category/model/category-group.model';
import { CategoryModel } from 'src/category/model/category.model';
import {
  CATEGORY_GROUP_MODELS,
  CATEGORY_MODELS,
} from 'src/db/seed/data/categories';
import { TENANTS } from 'src/db/seed/data/tenants';
import { USERS } from 'src/db/seed/data/users';
import { TenantModel } from 'src/tenant/model/tenant.model';
import { UserModel } from 'src/user/model/user.model';
import { EntityManager } from 'typeorm';

@Injectable()
export class PrePopulateDB {
  constructor(
    private readonly logger: Logger,
    private readonly em: EntityManager,
  ) {}

  async run() {
    this.logger.log('Start populating database...', PrePopulateDB.name);

    await this.seedWrapper('users', () => this.seedUsers());
    await this.seedWrapper('tenants', () => this.seedTenants());
    await this.seedWrapper('category groups', () => this.seedCategoryGroups());
    await this.seedWrapper('categories', () => this.seedCategories());

    this.logger.log('Finished populating database...', PrePopulateDB.name);
  }

  async seedUsers(): Promise<void> {
    if (USERS.length === TENANTS.length) {
      const userRepository = this.em.getRepository(UserModel);

      for (const user of USERS) {
        const userExists = await userRepository.findOne({
          where: { id: user.id },
        });

        if (!userExists) {
          const createdUserModel = userRepository.create(user);

          await userRepository.save(createdUserModel);
        }
      }
    } else {
      this.logger.error(
        'The number of users does not match the number of tenants. Skipping user seeding.',
        PrePopulateDB.name,
      );
    }
  }

  async seedTenants(): Promise<void> {
    if (USERS.length === TENANTS.length) {
      const tenantRepository = this.em.getRepository(TenantModel);

      for (const [index, tenant] of TENANTS.entries()) {
        const tenantExists = await tenantRepository.findOne({
          where: { id: tenant.id },
        });

        if (!tenantExists) {
          const createdTenantModel = tenantRepository.create({
            ...tenant,
            user: USERS[index], // Associate the tenant with the corresponding user
          });

          await tenantRepository.save(createdTenantModel);
        }
      }
    } else {
      this.logger.error(
        'The number of tenants does not match the number of users. Skipping tenant seeding.',
        PrePopulateDB.name,
      );
    }
  }

  async seedCategoryGroups(): Promise<void> {
    const categoryGroupRepository = this.em.getRepository(CategoryGroupModel);

    for (const categoryGroup of CATEGORY_GROUP_MODELS) {
      const categoryExists = await categoryGroupRepository.findOne({
        where: { id: categoryGroup.id },
      });

      if (!categoryExists) {
        await categoryGroupRepository.save(categoryGroup);
      }
    }
  }

  async seedCategories(): Promise<void> {
    const categoryRepository = this.em.getRepository(CategoryModel);

    for (const category of CATEGORY_MODELS) {
      const categoryExists = await categoryRepository.findOne({
        where: { id: category.id },
      });

      if (!categoryExists) {
        await categoryRepository.save(category);
      }
    }
  }

  private async seedWrapper(
    entity: string,
    seederFn: () => Promise<void>,
  ): Promise<void> {
    this.logger.log(`Seeding ${entity}...`, PrePopulateDB.name);

    await seederFn();

    this.logger.log(`Finished seeding ${entity}...`, PrePopulateDB.name);
  }
}
