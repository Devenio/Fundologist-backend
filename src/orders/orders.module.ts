import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ChallengesService } from 'src/challenges/challenges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from 'entities/Challenge';
import { UserOrders } from 'entities/UserOrders';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, UserOrders])],
  providers: [OrdersService, ChallengesService],
  controllers: [OrdersController]
})
export class OrdersModule {}
