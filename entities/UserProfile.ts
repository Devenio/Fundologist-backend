import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user_profile' })
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'blob' })
  profilePicture: Buffer;

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
