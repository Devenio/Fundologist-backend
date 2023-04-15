import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'entities/Ticket';
import { Repository } from 'typeorm';
import { CreateTicketDto, TICKET_STATUSES } from './ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async findAll(userId: number): Promise<Ticket[]> {
    const tickets = await this.ticketRepository.find({
      where: { user: { id: userId } },
    });

    return tickets;
  }

  async create(
    createTicketDto: CreateTicketDto,
    userId: string,
  ): Promise<Ticket> {
    const { title, description } = createTicketDto;
    const ticket = this.ticketRepository.create({ title, description });
    ticket.user = { id: userId } as any;
    return this.ticketRepository.save(ticket);
  }
}
