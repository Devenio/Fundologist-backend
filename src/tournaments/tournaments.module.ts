import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from 'entities/Tournament';
import { User } from 'entities/User';
import { UserAccounts } from 'entities/UserAccounts';
import { UserOrders } from 'entities/UserOrders';
import { UserRequests } from 'entities/UserRequests';
import { UserWithdraws } from 'entities/UserWithdraws';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, User, UserAccounts, UserRequests, UserWithdraws, UserOrders])],
  controllers: [TournamentsController],
  providers: [TournamentsService, UsersService]
})
export class TournamentsModule {}
