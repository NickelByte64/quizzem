import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserMapper } from 'src/user/user.mapper';
import { PageableQueryDto } from 'src/utils/pageable/dto/pageable-query.dto';
import { PageableDto } from 'src/utils/pageable/dto/pageable.dto';
import { PageableQuery } from 'src/utils/pageable/pageable.query';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @PageableQuery() query: PageableQueryDto,
  ): Promise<PageableDto<UserDto>> {
    const pageable = await this.userService.findAll(query);
    return { ...pageable, data: UserMapper.toDtoList(pageable.data) };
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<void> {
    await this.userService.create(data);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: UUID,
    @Body() data: UpdateUserDto,
  ): Promise<void> {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: UUID): Promise<void> {
    return await this.userService.delete(id);
  }
}
