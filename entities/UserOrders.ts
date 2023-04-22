import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Challenge } from './Challenge';
import { User } from './User';

export enum ORDER_STATUS {
  WAITING = 'WAITING',
  CONFIRMING = 'CONFIRMING',
  CONFIRMED = 'CONFIRMED',
  SENDING = 'SENDING',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  FINISHED = 'FINISHED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  EXPIRED = 'EXPIRED',
}

@Entity({ name: 'user_orders' })
export class UserOrders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: string;

  @Column({ default: ORDER_STATUS.WAITING })
  status: ORDER_STATUS;

  @ManyToOne(() => User, (user) => user.orders)
  user: User[];

  @ManyToOne(() => Challenge, (challenge) => challenge.orders)
  challenge: Challenge;

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
