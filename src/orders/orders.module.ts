import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ChallengesService } from 'src/challenges/challenges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from 'entities/Challenge';
import { UserOrders } from 'entities/UserOrders';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, UserOrders])],
  providers: [OrdersService, ChallengesService, PaymentService],
  controllers: [OrdersController]
})
export class OrdersModule {}
