import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Message } from 'entities/Message';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './create-message.dto';
import { User } from 'entities/User';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
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
