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

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.messages)
  ticket: Ticket;

  @ManyToOne(() => User, (user) => user.messages)
  user: User
}
