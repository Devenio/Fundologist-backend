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

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null, select: false })
  telegramUserId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

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

  @OneToMany(() => Challenge, (challenge) => challenge.user)
  challenges: Challenge[];

  @OneToMany(() => UserRequests, (requests) => requests.user)
  requests: UserRequests[];

  @OneToMany(() => UserAccounts, (account) => account.user)
  accounts: UserAccounts[];

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
    console.log(password, this.password, this.firstName);
    return bcrypt.compare(password, this.password);
  }
}
