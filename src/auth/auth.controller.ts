import { Body, Controller, Get, Param, Query, Post, Req, Request, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from 'src/profile/profile.service';
import { createOkResponse } from 'utils/createResponse';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    const profile = await this.profileService.getProfile(req.user.id);

    const user = {...req.user, isAuthenticating: false};
    if(profile && !req.user.isAuthenticated) user.isAuthenticating = true;

    return createOkResponse('', user);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.authService.register(createUserDto);
    return createOkResponse('به فاندولوژیست خوش آمدید', newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Request() req) {
    const res = await this.authService.loginUser(req.user);
    const profile = await this.profileService.getProfile(res.id);

    const user = {...res, isAuthenticating: false};
    if(profile && !res.isAuthenticated) user.isAuthenticating = true;

    return createOkResponse('شما با موفقیت وارد شدید', user);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    await this.authService.forgotPassword(body.email);
    return createOkResponse('ایمیل بازگردانی رمز عبور برای شما ارسال شد');
  }

  @Post('/reset-password')
  async resetPassword(
    @Query('resetToken') resetToken: string,
    @Body() body: { password: string },
  ) {
    await this.authService.resetPassword(resetToken, body.password);
    return createOkResponse('پسورد با موفقیت تغییر کرد. لطفا وارد شوید')
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  async changePassword(
    @Body('password') password: string,
    @Request() req
  ) {
    await this.authService.changePassword(req.user.id, password);
    return createOkResponse('پسورد با موفقیت تغییر کرد. لطفا وارد شوید')
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res) {
    const user = req.user;
    const {token} = await this.authService.loginUser(user);
    // return createOkResponse('با موفقیت وارد شدید', token);
    return res.redirect(`${process.env.FRONTEND_BASE_URL}/googleRedirect?token=${token}`)
  }
}
