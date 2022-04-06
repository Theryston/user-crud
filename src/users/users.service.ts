import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { ViacepService } from 'src/services/viacep/viacep.service';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private viacep: ViacepService) {}

  async create(userData: Prisma.UserCreateInput): Promise<User> {
    const birthdate: any = new Date(userData.birthdate);

    if (
      !userData.name ||
      userData.name.length < 2 ||
      userData.name.length > 100
    ) {
      throw new Error('Name must be between 2 and 100 characters');
    }

    if (!birthdate || birthdate.toString() === 'Invalid Date') {
      throw new Error('Birthdate is required');
    }

    if (!userData.zipcode || typeof userData.zipcode !== 'number') {
      throw new Error('Zipcode is required');
    }

    const cepData = await this.viacep.getCepData(userData.zipcode);

    return this.prisma.user.create({
      data: {
        ...userData,
        acceptedTerms: userData.acceptedTerms || false,
        birthdate,
        street: cepData.logradouro,
        neighborhood: cepData.bairro,
        city: cepData.localidade,
        state: cepData.uf,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    if (!id) {
      throw new Error('Id is required');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async findAll(pagination: PaginationDto) {
    const page = pagination.page || 0;
    const limit = pagination.limit || 10;

    const users = await this.prisma.user.findMany({
      skip: page * limit,
      take: limit,
    });

    const userAmount = await this.prisma.user.count();

    return {
      page,
      limit,
      total: users.length,
      data: users,
      hasNextPage: page * limit < userAmount,
    };
  }

  async remove(id: number) {
    if (!id) {
      throw new Error('Id is required');
    }

    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('User not found');
    }

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, userData: Prisma.UserCreateInput): Promise<User> {
    if ((userData as User).id) {
      throw new Error('Id cannot be updated');
    }

    if ((userData as User).createdAt) {
      throw new Error('CreatedAt cannot be updated');
    }

    if ((userData as User).updatedAt) {
      throw new Error('UpdatedAt cannot be updated');
    }

    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('User not found');
    }

    const userUpdated = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...userData,
      },
    });

    return userUpdated;
  }
}
