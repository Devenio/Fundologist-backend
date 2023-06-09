import { UserAccounts } from 'entities/UserAccounts';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './User';

export enum WITHDRAW_STATUS {
  PAID = 'PASSED',
  FAILED = 'FAILED',
  INPROGRESS = 'INPROGRESS'
}
@Entity({ name: 'user_withdraws' })
export class UserWithdraws {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  walletAddress: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  taxId: string;

  @Column({
    type: 'enum',
    enum: WITHDRAW_STATUS,
    default: WITHDRAW_STATUS.INPROGRESS
  })
  status: WITHDRAW_STATUS;

  @ManyToOne(() => UserAccounts, (account) => account.withdraws)
  account: UserAccounts;

  @ManyToOne(() => User, (user) => user.withdraws)
  user: User;

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
