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
  ManyToOne,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Ticket } from './Ticket';
import { UserRequests } from './UserRequests';
import { UserAccounts } from './UserAccounts';
import { UserProfile } from './UserProfile';
import { UserOrders } from './UserOrders';
import { UserWithdraws } from './UserWithdraws';
import { Tournament } from './Tournament';

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

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: false, type: 'boolean' })
  isAdmin: boolean;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isAuthenticated: boolean;

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

  @Column({ nullable: true })
  tournamentId: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.users)
  @JoinTable({ name: 'tournamentId' })
  tournament: Tournament;

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
