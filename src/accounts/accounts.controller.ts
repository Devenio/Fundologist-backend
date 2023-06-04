import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { createOkResponse } from 'utils/createResponse';
import { AccountsService } from './accounts.service';
import { NewAccountDto } from './create-account.dto';

@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(IsAdminGuard)
  @Post()
  async createNewAccount(@Body() newAccountDto: NewAccountDto) {
    const account = await this.accountsService.createAccount(newAccountDto);
    return createOkResponse('', account);
  }

  @Get()
  async findAll() {
    const accounts = await this.accountsService.findAll();
    return createOkResponse('', accounts);
  }
}
