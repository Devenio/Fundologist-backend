import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ACCOUNT_STATUS } from 'entities/UserAccounts';
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

  @UseGuards(IsAdminGuard)
  @Post('/:id')
  async updateAccountStatus(@Param('id') accountId: number, @Body('status') status: ACCOUNT_STATUS) {
    const account = await this.accountsService.updateUserAccountStatus(accountId, status);
    return createOkResponse('', account);
  }

  @Get()
  async findAll(@Query() query: {skip: number, limit: number} = {skip: 0, limit: 50}, @Request() req) {
    const accounts = await this.accountsService.findAll(req.user.id, query.skip, query.limit);
    return createOkResponse('', accounts);
  }

  @Get('/real')
  async findAllRealAccounts() {
    const accounts = await this.accountsService.findAllRealAccounts();
    return createOkResponse('', accounts);
  }
}
