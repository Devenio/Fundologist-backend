import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketMessage } from 'entities/TicketMessage';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(TicketMessage) private messageRepository: Repository<TicketMessage>,
  ) {}

  async create(message: string, userId: number, ticketId: number) {
    const messageRes = await this.messageRepository.create({ message });
    messageRes.ticket = { id: ticketId } as any;
    messageRes.user = { id: userId } as any;

    return this.messageRepository.save(messageRes);
  }

  async findAll(ticketId: number) {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .where('message.ticketId = :id', { id: ticketId })
      .orderBy('message.createdAt', 'DESC')
      .leftJoinAndSelect('message.user', 'user')
      .getMany();

    return messages;
  }
}
