import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';
import { createOkResponse } from 'utils/createResponse';

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
}
