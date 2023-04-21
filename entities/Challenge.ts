import { Plan } from './Plan';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  OneToOne
} from 'typeorm';
import { UserAccounts } from './UserAccounts';

@Entity({ name: 'challenges' })
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fund: number;
 
  @Column()
  firstTarget: number;
 
  @Column()
  secondTarget: number;
 
  @Column()
  minimumTradingDay: number;
 
  @Column()
  dailyDrawdown: number;
 
  @Column()
  overallDrawdown: number;
 
  @Column()
  maximumRisk: number;
 
  @Column()
  leverage: number;
 
  @Column()
  refund: number;
 
  @Column()
  price: number;
 
  @Column()
  accountGrowthTarget: number;
 
  @Column()
  maximumAccountGrowth: number;
 
  @ManyToOne(() => Plan, (plan) => plan.challenges)
  plan: Plan;
  
  @OneToOne(() => UserAccounts, (account) => account.challenge)
  account: UserAccounts;

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
