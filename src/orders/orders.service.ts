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
    const challenge = await this.challengesService.findOne(NewOrderDto.challengeId);

    const order = this.ordersRepository.create({
      invoiceId: 0,
      type: NewOrderDto.paymentType,
      platform: NewOrderDto.platform,
    });
    order.challenge = { id: challenge.id } as any;
    order.user = { id: user.id } as any;
    await this.ordersRepository.save(order);

    try {
      if(NewOrderDto.paymentType === PAYMENT_TYPES.NOW_PAYMENT) {
        const data = await this.paymentsService.nowPaymentHandler(challenge.price, order.id)
        order.invoiceId = data.id;
        await this.ordersRepository.save(order);
        return { data };
      } else {
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  async confirmOrder(orderId: number) {
    const order = await this.findOne(orderId)
    order.status = ORDER_STATUS.CONFIRMED;
    return this.ordersRepository.save(order)
  }

  async failedOrder(orderId: number) {
    const order = await this.findOne(orderId);    
    order.status = ORDER_STATUS.FAILED;
    return this.ordersRepository.save(order)
  }

  async findAll(userId: number) {
    const orders = await this.ordersRepository.find({
      where: { user: { id: userId } },
    });

    return orders;
  }

  async findOne(orderId: number) {
    const order = await this.ordersRepository.findOne({where: {id: orderId}});
    return order;
  }
}
