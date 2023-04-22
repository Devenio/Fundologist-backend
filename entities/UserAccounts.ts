import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  OneToOne
} from 'typeorm';
import { Challenge } from './Challenge';
import { User } from './User';
import { UserWithdraws } from './UserWithdraws';

@Entity({ name: 'user_accounts' })
export class UserAccounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.requests)
  user: User;

  @ManyToOne(() => Challenge, (challenge) => challenge.accounts)
  challenge: Challenge;

  @OneToOne(() => UserWithdraws, (withdraw) => withdraw.account)
  withdraw: UserWithdraws;

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
