import { TicketMessage } from './TicketMessage';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'open' })
  status: string;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  @OneToMany(() => TicketMessage, (message) => message.ticket)
  messages: TicketMessage[];

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
