import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'entities/User';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...data,
      createdAt: new Date().toISOString(),
    });
    return this.userRepository.save(newUser);
  }
}
