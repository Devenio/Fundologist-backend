import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from 'entities/FIles';
import { UserProfile } from 'entities/UserProfile';
import { User } from 'entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Files, UserProfile, User])],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
