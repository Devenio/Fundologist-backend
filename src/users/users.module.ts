import { UsersService } from './users.service';
import { UsersController } from './user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/User';
import { UserAccounts } from 'entities/UserAccounts';
import { UserRequests } from 'entities/UserRequests';
import { UserWithdraws } from 'entities/UserWithdraws';
import { UserOrders } from 'entities/UserOrders';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAccounts, UserRequests, UserWithdraws, UserOrders])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
