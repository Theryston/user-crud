import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { Prisma } from '@prisma/client';
import { AccessGuard } from 'src/access.guard';
import { FiltersDto } from './dto/filters.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userData: Prisma.UserCreateInput) {
    try {
      return await this.usersService.create(userData);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('filters') filters: string,
  ) {
    try {
      let filtersObj: FiltersDto;
      if (filters) {
        filtersObj = filters.split(',').reduce((acc, cur) => {
          const [key, value] = cur.split('=');
          return { ...acc, [key]: value };
        }, {} as FiltersDto);
      }

      return await this.usersService.findAll({
        page: +page,
        limit: +limit,
        filters: filtersObj,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @UseGuards(AccessGuard)
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(+id);
      return {
        message: 'User deleted',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: Prisma.UserCreateInput,
  ) {
    try {
      return await this.usersService.update(+id, userData);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
