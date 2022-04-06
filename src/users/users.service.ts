import { Catch, Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, Prisma } from '@prisma/client';
import { ViacepService } from 'src/services/viacep/viacep.service';

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

  findOne(id: number): Promise<User> {
    if (!id) {
      throw new Error('Id is required');
    }

    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  findAll() {
    return `Change`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
