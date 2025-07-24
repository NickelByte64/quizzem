import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserModel } from 'src/user/model/user.model';
import { PageableQueryDto } from 'src/utils/pageable/dto/pageable-query.dto';
import { PageableDto } from 'src/utils/pageable/dto/pageable.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
  ) {}

  async findAll(query: PageableQueryDto): Promise<PageableDto<UserModel>> {
    const { page, size } = query;

    const [users, count] = await this.userRepo.findAndCount({
      skip: PageableQueryDto.getSkip(page, size),
      take: PageableQueryDto.getTake(size),
    });

    return new PageableDto({
      page,
      size,
      totalElements: count,
      data: users,
    });
  }

  async findOneById(id: UUID): Promise<UserModel | null> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async findOneByUserName(userName: string): Promise<UserModel | null> {
    return await this.userRepo.findOne({ where: { userName } });
  }

  async create(data: CreateUserDto): Promise<UserModel> {
    const userExists = await this.userRepo.findOne({
      where: { userName: data.userName },
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const user = this.userRepo.create(data);
    return await this.userRepo.save(user);
  }

  async update(id: UUID, data: UpdateUserDto): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.userRepo.update(id, data);
  }

  async delete(id: UUID): Promise<void> {
    await this.userRepo.delete(id);
  }
}
