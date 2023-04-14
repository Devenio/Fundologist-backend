import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UsersModel } from './users.model';
import { User } from 'entities/User';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findAll(limit?: number, offset?: number) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    if (limit) {
      queryBuilder.take(limit);
    }
    if (offset) {
      queryBuilder.skip(offset);
    }
    return queryBuilder.getMany();
  }
}
