import { createOkResponse } from 'utils/createResponse';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.guard';
import { CreateTicketDto } from './ticket.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const tickets = this.ticketsService.findAll(req.user.id);
    return createOkResponse('درخواست با موفقیت انجام شد', tickets)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTicketDto: CreateTicketDto, @Request() req) {
    const response = this.ticketsService.create(createTicketDto, req.user.id);
    return createOkResponse('تیکت شما با موفقیت ارسال شد', response)
  }
}