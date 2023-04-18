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
  JoinColumn
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Ticket } from './Ticket';
import { UserRequest } from './UserRequest';
import { Account } from './Account';
import { UserProfile } from './UserProfile';

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: "", select: false })
  resetToken: string;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @OneToMany(() => TicketMessage, (message) => message.user)
  messages: TicketMessage[];

  @OneToMany(() => Challenge, (challenge) => challenge.user)
  challenges: Challenge[];

  @OneToMany(() => UserRequest, (request) => request.user)
  requests: UserRequest[];

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

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
    return bcrypt.compare(password, this.password)
  }
}
