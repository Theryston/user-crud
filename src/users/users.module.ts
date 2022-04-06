import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../services/prisma/prisma.service';
import { ViacepService } from 'src/services/viacep/viacep.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, ViacepService],
})
export class UsersModule {}
