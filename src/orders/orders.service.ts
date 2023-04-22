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

    try {
      const response = await NowPaymentService.post('/invoice', {
        price_amount: challenge.price,
        price_currency: 'usd',
        pay_currency: 'usdttrc20',
        ipn_callback_url: `${process.env.BACKEND_BASE_URL}/orders/ipn`,
        success_url: `${process.env.FRONTEND_BASE_URL}/panel/payments/success`,
        cancel_url: `${process.env.FRONTEND_BASE_URL}/panel/payments/failed`,
        is_fee_paid_by_user: false,
      });

      const order = this.ordersRepository.create({
        orderId: response.data.id,
      });
      order.challenge = { id: challenge.id } as any;
      order.user = { id: user.id } as any;
      await this.ordersRepository.save(order)

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
