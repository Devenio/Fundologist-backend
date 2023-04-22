import { Controller, Get, Post, Body } from '@nestjs/common';
import { BuyAccountDto } from './buy-account.dto';

@Controller('accounts')
export class AccountsController { 
    @Post('/new')
    async findAll(@Body() buyAccountDto: BuyAccountDto) {
    //   return createOkResponse(null, challenges);
    }
}
