import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { User } from 'entities/User';
import { ORDER_STATUS, UserOrders } from 'entities/UserOrders';
import { NowPaymentService } from 'services/nowPaymentService';
import { ChallengesService } from 'src/challenges/challenges.service';
import { NewOrderDto, PAYMENT_TYPES } from './new-order.dto';
import { Repository } from 'typeorm';
import { PaymentService } from 'src/payment/payment.service';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

config();
@Injectable()
export class OrdersService {
  constructor(
    private readonly challengesService: ChallengesService,
    private readonly paymentsService: PaymentService,
    @InjectRepository(UserOrders)
    private ordersRepository: Repository<UserOrders>,
  ) {}

  async createNewOrder(NewOrderDto: NewOrderDto, user: User) {
    const challenge = await this.challengesService.findOne(
      NewOrderDto.challengeId,
    );

    const order = this.ordersRepository.create({
      invoiceId: 0,
      type: NewOrderDto.paymentType,
      platform: NewOrderDto.platform,
      amount: challenge.price,
    });
    order.challenge = { id: challenge.id } as any;
    order.user = { id: user.id } as any;
    await this.ordersRepository.save(order);

    try {
      let data;

      if (NewOrderDto.paymentType === PAYMENT_TYPES.NOW_PAYMENT) {
        data = await this.paymentsService.nowPaymentHandler(
          challenge.price,
          order.id,
        );
        order.invoiceId = data.id;
      } else {
        data = await this.paymentsService.zarinpalHandler(
          challenge.price,
          user,
        );
        order.authority = data.authority;
      }

      await this.ordersRepository.save(order);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
 
  async verify(authority: string) {
    const order = await this.ordersRepository.findOne({
      where: {
        authority,
      },
    }); 
    if(!order) {
      throw new NotFoundException('سفارشی با این اطلاعات یافت نشد');
    }


    const data = await this.paymentsService.verifyZarinpalPayment(authority, order.amount);
    if(data.code === 100 || data.code === 101) {
      await this.confirmOrder(order.id);
    } else {
      await this.failedOrder(order.id);
    }

    return data
  }

  async confirmOrder(orderId: number) {
    const order = await this.findOne(orderId);
    order.status = ORDER_STATUS.CONFIRMED;
    return this.ordersRepository.save(order);
  }

  async failedOrder(orderId: number) {
    const order = await this.findOne(orderId);
    order.status = ORDER_STATUS.FAILED;
    return this.ordersRepository.save(order);
  }

  async findAll(userId: number) {
    const orders = await this.ordersRepository.find({
      where: { user: { id: userId } },
    });

    return orders;
  }

  async findOne(orderId: number) {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
    });
    return order;
  }
}
