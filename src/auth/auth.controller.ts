import { Body, Controller, Post, Request, UseGuards, Get, Req, Param } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { createOkResponse, createResponse } from 'utils/createResponse';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './gaurds/local-auth.gaurd';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.authService.createUser(createUserDto);
    return createOkResponse('شما با موفقیت ثبت نام شدید برای ادامه لطفا وارد شوید', newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Request() req) {
    const token = await this.authService.loginUser(req.user); 
    return createOkResponse('شما با موفقیت وارد شدید', token);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    await this.authService.forgotPassword(body.email);
    return createOkResponse('ایمیل بازگردانی رمز عبور برای شما ارسال شد');
  }

  @Post('/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() body: { password: string },
  ) {
    await this.authService.resetPassword(token, body.password);
    return createOkResponse('پسورد با موفقیت تغییر کرد. لطفا وارد شوید')
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req) {
    const user = req.user;
    const token = await this.authService.loginUser(user);
    return token
  }
}
