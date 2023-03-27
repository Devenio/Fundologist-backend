import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'entities/User';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtTokenService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDto,
    });
    await this.userRepository.save(newUser);

    delete newUser.password;
    return newUser;
  }

  async loginWithCredentials(user: User) {
    delete user.password;
    const payload = { ...user };
    
    return {
      access_token: this.jwtTokenService.sign(payload),
    };
  }
}
