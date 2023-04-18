import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

export enum REQUEST_TYPES {
  CREATE_SECOND_ACCOUNT = 'CREATE_SECOND_ACCOUNT',
  CREATE_REAL_ACCOUNT = 'CREATE_REAL_ACCOUNT',
  CREATE_EXTEND_ACCOUNT = 'CREATE_EXTEND_ACCOUNT',
  CREATE_RESET_ACCOUNT = 'CREATE_RESET_ACCOUNT',
}

export enum REQUEST_STATUSES {
  IN_PROGRESS = 'IN_PROGRESS',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED'
}

@Entity({ name: 'user_requests' })
export class UserRequests {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: REQUEST_TYPES;

  @Column()
  description: string;

  @Column({ default: REQUEST_STATUSES.IN_PROGRESS })
  status: REQUEST_STATUSES;

  @ManyToOne(() => User, (user) => user.requests)
  user: User;

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
