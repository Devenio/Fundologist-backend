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

@Entity({ name: 'requests' })
export class UserRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: REQUEST_TYPES;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.requests)
  user: User;

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
