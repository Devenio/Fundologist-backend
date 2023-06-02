import { Challenge } from './Challenge';
import { TicketMessage } from './TicketMessage';
import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Ticket } from './Ticket';
import { UserRequests } from './UserRequests';
import { UserAccounts } from './UserAccounts';
import { UserProfile } from './UserProfile';
import { UserOrders } from './UserOrders';
import { UserWithdraws } from './UserWithdraws';

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null, select: false, type: 'varchar' })
  telegramUserId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  avatar: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '', select: false })
  resetToken: string;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @OneToMany(() => TicketMessage, (message) => message.user)
  messages: TicketMessage[];

  @OneToMany(() => UserRequests, (requests) => requests.user)
  requests: UserRequests[];

  @OneToMany(() => UserAccounts, (account) => account.user)
  accounts: UserAccounts[];

  @OneToMany(() => UserOrders, (orders) => orders.user)
  orders: UserOrders[];

  @OneToMany(() => UserWithdraws, (withdraws) => withdraws.user)
  withdraws: UserWithdraws[];

  @OneToOne(() => UserProfile)
  @JoinColumn()
  profile: UserProfile;

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    const isMatched = await bcrypt.compare(password, this.password); 
    return isMatched;
  }
}
