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
import { UserRequests } from './UserRequests';
import { UserWithdraws } from './UserWithdraws';

export enum ACCOUNT_LEVELS {
  LEVEL_1 = 'LEVEL_1',
  LEVEL_2 = 'LEVEL_2',
  REAL = 'REAL',
  TOURNAMENT = 'TOURNAMENT'
}

export enum ACCOUNT_STATUS {
  PASSED = 'PASSED',
  FAILED = 'FAILED',
  CHECKING = 'CHECKING'
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

  @Column({
    type: 'enum',
    enum: ACCOUNT_STATUS,
    default: ACCOUNT_STATUS.CHECKING
  })
  status: ACCOUNT_STATUS;

  @ManyToOne(() => User, (user) => user.requests)
  user: User;

  @ManyToOne(() => Challenge, (challenge) => challenge.accounts)
  challenge: Challenge;

  @ManyToOne(() => Servers, (server) => server.accounts)
  server: Servers;

  @OneToMany(() => UserWithdraws, (withdraw) => withdraw.account)
  withdraws: UserWithdraws[];

  @OneToMany(() => UserRequests, (request) => request.account)
  requests: UserRequests[];

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
