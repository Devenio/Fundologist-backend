import { AuthGuard } from '@nestjs/passport/dist';
import { Body, HttpStatus, UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { createResponse } from 'utils/createResponse';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);

    // try {
    //   await this.authService.createUser(data);
    //   return createResponse(HttpStatus.OK, 'شما با موفقیت در سایت ثبت نام شدید.');
    // } catch (error) {
    // }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {

  }
}
