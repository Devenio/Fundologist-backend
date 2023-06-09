import { UsersService } from './users.service';
import { UsersController } from './user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/User';
import { UserAccounts } from 'entities/UserAccounts';
import { UserRequests } from 'entities/UserRequests';
import { UserWithdraws } from 'entities/UserWithdraws';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAccounts, UserRequests, UserWithdraws])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
