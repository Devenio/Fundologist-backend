import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UsersModel } from './users.model';
import { User } from 'entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UserAccounts } from 'entities/UserAccounts';
import { AccountsService } from 'src/accounts/accounts.service';
import { UserRequests } from 'entities/UserRequests';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

    @InjectRepository(UserAccounts)
    private accountsRepository: Repository<UserAccounts>,
    @InjectRepository(UserRequests)
    private requestRepository: Repository<UserRequests>,
  ) {}

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findOneById(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user;
  }

  async findOneByTelegramUserId(id: number) {
    const user = await this.userRepository.findOne({
      where: { telegramUserId: id },
    });
    return user;
  }

  async deleteTelegramUserId(fromId: number) {
    const user = await this.userRepository.findOne({
      where: { telegramUserId: fromId },
    });
    if (user) {
      user.telegramUserId = null;
      await this.userRepository.save(user);
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

  async updateUser(userId: number, data: UpdateUserDto) {
    const user = await this.findOneById(userId);

    if (data.email) user.email = data.email;
    if (data.firstName) user.firstName = data.firstName;
    if (data.lastName) user.lastName = data.lastName;
    if (data.phone) user.phone = data.phone;

    return this.userRepository.save(user);
  }

  // Admin Methods
  async getUserAccounts(userId, skip, limit) {
    const userAccounts = await this.accountsRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.server', 'server')
      .leftJoinAndSelect('account.challenge', 'challenge')
      .leftJoinAndSelect('challenge.plan', 'plan')
      .where('account.user.id = :userId', { userId })
      .skip(skip)
      .limit(limit)
      .orderBy('account.createdAt', 'DESC')
      .getMany();

    return userAccounts;
  }
  async getUserRequests(userId, skip, limit) {
    const res = await this.requestRepository
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.account', 'account')
      .where('request.user.id = :userId', { userId })
      .skip(skip)
      .take(limit)
      .orderBy('request.createdAt', 'DESC')
      .getMany();

    return res;
  }
}
