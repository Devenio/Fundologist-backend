import { PAYMENT_TYPES } from 'src/orders/new-order.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Challenge } from './Challenge';
import { Servers } from './Servers';
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

export enum PLATFORMS {
  MT4 = 'MT4',
  MT5 = 'MT5',
}

@Entity({ name: 'user_orders' })
export class UserOrders {
  @PrimaryGeneratedColumn()
  id: number;

  // For Now Payment
  @Column({ type: 'varchar', nullable: true })
  invoiceId: number;

  // For Zarinpall
  @Column({ type: 'varchar', nullable: true })
  authority: string;

  @Column({ type: 'enum', enum: ORDER_STATUS, default: ORDER_STATUS.WAITING })
  status: ORDER_STATUS;

  @Column({
    type: 'enum',
    enum: PAYMENT_TYPES,
  })
  type: PAYMENT_TYPES;

  @Column()
  platform: PLATFORMS;

  @Column()
  amount: number;

  @Column({ nullable: true })
  rlsAmount: number;

  @Column({ nullable: true })
  paymentURL: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User[];

  @ManyToOne(() => Challenge, (challenge) => challenge.orders)
  challenge: Challenge;

  @ManyToOne(() => Servers, (server) => server.orders)
  server: Servers;

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
