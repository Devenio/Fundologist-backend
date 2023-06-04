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

  async findOneByTelegramUserId(id: number) {
    const user = await this.userRepository.findOne({ where: { telegramUserId: id } });
    return user;
  }

  async deleteTelegramUserId(fromId: number) {
    const user = await this.userRepository.findOne({ where: { telegramUserId: fromId } });
    if(user) {
      user.telegramUserId = null;
      await this.userRepository.save(user)
    }
    return user;
  }

  async findOneByEmailAddSelectPassword(email: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDto,
    });
    return this.userRepository.save(newUser);
  }

  async findAll(limit?: number, skip?: number) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    if (limit) {
      queryBuilder.take(limit);
    }
    if (skip) {
      queryBuilder.skip(skip);
    }
    return queryBuilder.getMany();
  }

  async addTelegramId(email: string, id: number) {
    const user = await this.findOneByEmail(email);
    user.telegramUserId = id;
    return this.userRepository.save(user);
  }
}
