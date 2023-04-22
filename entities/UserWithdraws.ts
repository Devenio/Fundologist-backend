import { UserAccounts } from 'entities/UserAccounts';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

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

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
