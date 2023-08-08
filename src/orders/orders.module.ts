import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ChallengesService } from 'src/challenges/challenges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from 'entities/Challenge';
import { UserOrders } from 'entities/UserOrders';
import { PaymentService } from 'src/payment/payment.service';
import { DiscountCodeService } from 'src/discount-codes/discount-codes.service';
import { DiscountCode } from 'entities/DiscountCodes';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, UserOrders, DiscountCode])],
  providers: [OrdersService, ChallengesService, PaymentService, DiscountCodeService],
  controllers: [OrdersController]
})
export class OrdersModule {}
