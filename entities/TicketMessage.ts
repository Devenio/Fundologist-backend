import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Ticket } from './Ticket';
import { User } from './User';

@Entity({ name: 'ticket_messages' })
export class TicketMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.messages)
  ticket: Ticket;

  @ManyToOne(() => User, (user) => user.messages)
  user: User

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
