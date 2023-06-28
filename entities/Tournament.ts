import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'tournaments' })
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;

  // Define the relationship with users
  @OneToMany(() => User, (user) => user.tournament)
  users: User[];
}
