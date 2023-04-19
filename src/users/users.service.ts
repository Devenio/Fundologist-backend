import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UsersModel } from './users.model';
import { User } from 'entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDto,
    });
    return this.userRepository.save(newUser);
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

  async addTelegramId(email: string, id: number) {
    const user = await this.findOneByEmail(email);
    user.telegramUserId = id;
    return this.userRepository.save(user);
  }
}
