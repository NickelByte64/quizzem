import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryGroupModel } from 'src/category/model/category-group.model';
import { CategoryModel } from 'src/category/model/category.model';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryModel, CategoryGroupModel])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
