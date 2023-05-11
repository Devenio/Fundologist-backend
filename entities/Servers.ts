import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { PLATFORMS } from './UserOrders';
  
  @Entity({ name: 'servers' })
  export class Servers {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    description: string;

    @Column({
        type: 'set',
        enum: [PLATFORMS.MT4, PLATFORMS.MT5],
        default: [PLATFORMS.MT4]
    })
    platforms: (PLATFORMS.MT4 | PLATFORMS.MT5)[]
  
    @Column()
    @CreateDateColumn()
    createdAt: string;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: string;
  }
  