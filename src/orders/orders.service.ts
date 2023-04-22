import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { User } from 'entities/User';
import { UserOrders } from 'entities/UserOrders';
import { NowPaymentService } from 'services/nowPaymentService';
import { ChallengesService } from 'src/challenges/challenges.service';
import { NewOrderDto } from './new-order.dto';
import { Repository } from 'typeorm';

config();
@Injectable()
export class OrdersService {
  constructor(
    private readonly challengesService: ChallengesService,
    @InjectRepository(UserOrders)
    private ordersRepository: Repository<UserOrders>,
  ) {}

  async createNewOrder(data: NewOrderDto, user: User) {
    const challenge = await this.challengesService.findOne(data.challengeId);

    const order = this.ordersRepository.create({ invoiceId: 0 });
    order.challenge = { id: challenge.id } as any;
    order.user = { id: user.id } as any;
    await this.ordersRepository.save(order);

    try {
      const { data } = await NowPaymentService.post('/invoice', {
        price_amount: challenge.price,
        order_id: `${order.id}`,
        price_currency: 'usd',
        pay_currency: 'usdttrc20',
        ipn_callback_url: `${process.env.BACKEND_BASE_URL}/orders/ipn`,
        success_url: `${process.env.FRONTEND_BASE_URL}/panel/payments/success/${order.id}`,
        cancel_url: `${process.env.FRONTEND_BASE_URL}/panel/payments/failed/${order.id}`,
        is_fee_paid_by_user: false,
      });

      order.invoiceId = data.id;
      await this.ordersRepository.save(order);

      return { data };
    } catch (error) {
      console.log(error);
    }
  }
}
