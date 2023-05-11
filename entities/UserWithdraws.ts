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

@Entity({ name: 'user_withdraws' })
export class UserWithdraws {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  walletAddress: string;

  @Column()
  description: string;

  @OneToOne(() => UserAccounts, (account) => account.withdraw)
  account: UserAccounts;

  @ManyToOne(() => User, (user) => user.withdraws)
  user: User[];

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
