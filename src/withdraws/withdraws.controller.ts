import { Controller, UseGuards, Post, Body, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { createOkResponse } from 'utils/createResponse';
import { NewWithdrawDto } from './new-withdraw.dto';
import { WithdrawsService } from './withdraws.service';
@UseGuards(JwtAuthGuard)
@Controller('withdraws')
export class WithdrawsController {
  constructor(private readonly withdrawsService: WithdrawsService) {}

  @Get() 
  async findAll(@Body('skip') skip: number, @Body('limit') limit: number, @Request() req) {
    const data = await this.withdrawsService.findAll(req.user.id, {skip, limit});
    return createOkResponse(null, data);
  }

  @Post() 
  async createNewOrder(@Body() body: NewWithdrawDto, @Request() req) {
    const data = await this.withdrawsService.add(body, req.user.id);
    return createOkResponse(null, data);
  }
}
