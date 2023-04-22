import { Plan } from './Plan';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserAccounts } from './UserAccounts';
import { UserOrders } from './UserOrders';

@Entity({ name: 'challenges' })
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fund: number;

  @Column({ nullable: true })
  firstTarget: number;

  @Column({ nullable: true })
  secondTarget: number;

  @Column({ nullable: true })
  minimumTradingDay: number;

  @Column({ nullable: true })
  dailyDrawdown: number;

  @Column()
  overallDrawdown: number;

  @Column()
  maximumRisk: number;

  @Column()
  leverage: number;

  @Column({ nullable: true })
  refund: number;

  @Column()
  price: number;

  @Column({ nullable: true })
  accountGrowthTarget: number;

  @Column({ nullable: true })
  maximumAccountGrowth: number;

  @ManyToOne(() => Plan, (plan) => plan.challenges)
  plan: Plan;

  @OneToMany(() => UserAccounts, (account) => account.challenge)
  accounts: UserAccounts[];

  @OneToMany(() => UserOrders, (order) => order.challenge)
  orders: UserOrders[];

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
