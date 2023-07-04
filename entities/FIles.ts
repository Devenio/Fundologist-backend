import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Challenge } from './Challenge';
import { UserProfile } from './UserProfile';

export enum FILE_TYPES {
    ID_CARD = 'ID_CARD',
    ID_CARD_WITH_FACE = 'ID_CARD_WITH_FACE'
}

@Entity({ name: 'files' })
export class Files {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column({ type: 'mediumblob' })
  fileData: Buffer;

  @Column()
  fileMimeType: string;

  @Column({ type: 'enum', enum: FILE_TYPES })
  fileType: FILE_TYPES;

  @Column({ nullable: true })
  hash: string;

  @ManyToOne(() => UserProfile, (profile) => profile.files)
  profile: UserProfile;

  @Column()
  @CreateDateColumn()
  createdAt: string;

  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}