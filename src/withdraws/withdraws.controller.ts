import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { WITHDRAW_STATUS } from 'entities/UserWithdraws';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { createOkResponse } from 'utils/createResponse';
import { NewWithdrawDto } from './new-withdraw.dto';
import { WithdrawsService } from './withdraws.service';
@UseGuards(JwtAuthGuard)
@Controller('withdraws')
export class WithdrawsController {
  constructor(private readonly withdrawsService: WithdrawsService) {}

  @Get()
  async findAll(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
    @Request() req,
  ) {
    const data = await this.withdrawsService.findAll(req.user.id, {
      skip,
      limit,
    });
    return createOkResponse(null, data);
  }

  @Post()
  async createNewOrder(@Body() body: NewWithdrawDto, @Request() req) {
    const data = await this.withdrawsService.add(body, req.user.id);
    return createOkResponse(null, data);
  }

  // Admin
  @UseGuards(IsAdminGuard)
  @Post('/:id')
  async update(
    @Param('id') id: number,
    @Body('status') status?: WITHDRAW_STATUS,
    @Body('taxId') taxId?: string,
  ) {
    let res;
    if(status) {
      res = await this.withdrawsService.updateStatus(id, status);
    }
    if(taxId) {
      res = await this.withdrawsService.updateTaxId(id, taxId);
    }
    return createOkResponse('', res);
  }
}
