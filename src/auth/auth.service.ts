import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/User';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  createToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
    };
    const token = this.jwtService.sign(payload);
    return token
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);

    delete newUser.password;
    delete newUser.resetToken;

    return newUser;
  }

  async register(createUserDto: CreateUserDto) {
    const isUserExist = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (isUserExist) {
      throw new ConflictException('این ایمیل قبلا ثبت شده است');
    }

    const newUser = await this.createUser(createUserDto);

    return {
      token: this.createToken(newUser),
      ...newUser
    }
  }

  async loginUser(user: User) {
    return {
      ...user, 
      token: this.createToken(user)
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmailAddSelectPassword(email);
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

  // Forgot and Reset password
  async forgotPassword(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('کاربری با این ایمیل یافت نشد.');
    }
    // Generate reset token and save it to the database
    const resetToken = Math.random().toString(36).substr(2);
    user.resetToken = resetToken;
    await this.userRepository.save(user);
    // Send email with reset link
    const resetPasswordLink = `https://fundologist.ir/resetPassword?resetToken=${resetToken}`;
    const response = await this.mailerService.sendMail({
      to: user.email,
      subject: 'بازگردانی رمز عبور',
      // template: '../templates/forgotPasswordEmail.hbs',
      // context: {
      //   name: user.firstName,
      //   link: `https://fudologist.ir/reset-password/${resetToken}`,
      // },
      html: `برای بازگردانی رمز عبور لطفا روی لینک روبرو کلیک کن: 
      <a href="${resetPasswordLink}">${resetPasswordLink}</a>`,
    });

    return response;
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: { resetToken: token },
    });
    if (!user) {
      throw new Error('Invalid reset token');
    }
    // Update user's password and clear reset token
    user.password = newPassword;
    user.resetToken = '';
    return await this.userRepository.save(user);
  }

  async changePassword(userId: number, newPassword: string) {
    const user = await this.usersService.findOneById(userId)
    const password = await bcrypt.hash(newPassword, 8);
    user.password = password;
    return this.userRepository.save(user);
  }
}
