import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Challenge } from './Challenge';
import { Servers } from './Servers';
import { User } from './User';
import { PLATFORMS } from './UserOrders';
import { UserWithdraws } from './UserWithdraws';

export enum ACCOUNT_LEVELS {
  LEVEL_1 = 'LEVEL_1',
  LEVEL_2 = 'LEVEL_2',
  REAL = 'REAL'
}
@Entity({ name: 'user_accounts' })
export class UserAccounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  platform: PLATFORMS;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  investorPassword: string;

  @Column()
  level: ACCOUNT_LEVELS;

  @ManyToOne(() => User, (user) => user.requests)
  user: User;

  @ManyToOne(() => Challenge, (challenge) => challenge.accounts)
  challenge: Challenge;

  @ManyToOne(() => Servers, (server) => server.accounts)
  server: Servers;

  @OneToMany(() => UserWithdraws, (withdraw) => withdraw.account)
  withdraws: UserWithdraws[];

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
