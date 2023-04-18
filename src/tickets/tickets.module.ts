import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'entities/Ticket';
import { UsersModule } from 'src/users/users.module';
import { MessagesService } from 'src/messages/messages.service';
import { TicketMessage } from 'entities/TicketMessage';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, TicketMessage]), UsersModule],
  controllers: [TicketsController],
  providers: [TicketsService, MessagesService],
})
export class TicketsModule {}
