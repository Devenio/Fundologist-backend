import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne
} from 'typeorm';
import { Files } from './FIles';
import { User } from './User';

@Entity({ name: 'user_profile' })
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nationalId: string;

  @Column()
  birthday: string;

  @OneToMany(() => Files, (files) => files.profile)
  files: Files[];

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
