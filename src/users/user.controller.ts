import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  UseGuards,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';
import { createOkResponse } from 'utils/createResponse';
import { UpdateUserDto } from './update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(IsAdminGuard)
  @Get('')
  async listAllUsers(
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('skip', ParseIntPipe) skip?: number,
  ) {
    const users = await this.usersService.findAll(limit, skip);
    return createOkResponse('', users)
  }

  @UseGuards(IsAdminGuard)
  @Get('/:id/accounts')
  async findUserAccounts(
    @Param('id') userId: string,
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('skip', ParseIntPipe) skip?: number,
  ) {
    const accounts = await this.usersService.getUserAccounts(userId, skip, limit);
    return createOkResponse('', accounts)
  }
  @UseGuards(IsAdminGuard)
  @Get('/:id/requests')
  async findUserRequests(
    @Param('id') userId: string,
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('skip', ParseIntPipe) skip?: number,
  ) {
    const res = await this.usersService.getUserRequests(userId, skip, limit);
    return createOkResponse('', res)
  }
  @UseGuards(IsAdminGuard)
  @Get('/:id/withdraws')
  async findUserWithdraws(
    @Param('id') userId: string,
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('skip', ParseIntPipe) skip?: number,
  ) {
    const res = await this.usersService.getUserWithdraws(userId, skip, limit);
    return createOkResponse('', res)
  }
  
  @Patch('/:id')
  async updateUser(
    @Body() body: UpdateUserDto,
    @Param('id') userId: string
  ) {
    const user = await this.usersService.updateUser(+userId, body);
    return createOkResponse('اطلاعات شما با موفقیت به روزسانی شد', user)
  }
}
