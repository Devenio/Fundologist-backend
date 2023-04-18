import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketMessage } from 'entities/TicketMessage';

@Module({
  imports: [TypeOrmModule.forFeature([TicketMessage])],
  providers: [MessagesService],
  controllers: [MessagesController]
})
export class MessagesModule {}
