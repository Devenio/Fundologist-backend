import { Body, HttpStatus } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { createResponse } from 'utils/createResponse';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() data: CreateUserDto) {
    return this.authService.createUser(data);

    // try {
    //   await this.authService.createUser(data);
    //   return createResponse(HttpStatus.OK, 'شما با موفقیت در سایت ثبت نام شدید.');
    // } catch (error) {
    // }
  }
}
