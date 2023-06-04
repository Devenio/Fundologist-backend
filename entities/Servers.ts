import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserOrders } from './UserOrders';

enum PLATFORMS {
  MT4 = 'MT4',
  MT5 = 'MT5',
}
@Entity({ name: 'servers' })
export class Servers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => UserOrders, (orders) => orders.server)
  orders: UserOrders[];

  @Column({
    type: 'set',
    enum: [PLATFORMS.MT4, PLATFORMS.MT5],
    default: [PLATFORMS.MT4],
  })
  platforms: (PLATFORMS.MT4 | PLATFORMS.MT5)[];

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
