import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'entities/User';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
import {
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { UsersService } from 'src/users/users.service';
import { UsersModel } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDto,
    });
    await this.userRepository.save(newUser);

    delete newUser.password;
    return newUser;
  }

  async loginUser(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;

    const passwordMatches = await user.validatePassword(password);
    if (user && passwordMatches) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserByEmail(email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }
}
