import { createOkResponse } from 'utils/createResponse';
import { Body, Controller, Get, Post, Request, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.guard';
import { CreateTicketDto } from './ticket.dto';
import { TicketsService } from './tickets.service';
import { MessagesService } from 'src/messages/messages.service';
import { CreateMessageDto } from 'src/messages/create-message.dto';

@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly messagesService: MessagesService,
  ) {}

  @Get()
  async findAll(@Request() req) {
    const tickets = await this.ticketsService.findAll(req.user.id);
    return createOkResponse('درخواست با موفقیت انجام شد', tickets);
  }

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto, @Request() req) {
    const ticket = await this.ticketsService.create(
      createTicketDto,
      req.user.id,
    );
    return createOkResponse('تیکت شما با موفقیت ارسال شد', ticket);
  }

  @Get(':ticketId')
  async findOne(@Request() req, @Param('ticketId') ticketId: number) {
    const tickets = await this.messagesService.findAll(ticketId);
    return createOkResponse('درخواست با موفقیت انجام شد', tickets);
  }

  @Post(':ticketId')
  async createMessage(
    @Param('ticketId') ticketId: number,
    @Body() createMessageDto: CreateMessageDto,
    @Request() req,
  ) {
    return this.messagesService.create(createMessageDto.message, req.user.id, ticketId);
  }
}
