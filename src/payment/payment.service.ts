import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { NowPaymentService } from 'services/nowPaymentService';

config()

@Injectable()
export class PaymentService {
  async nowPaymentHandler(amount: number, orderId: number) {
    const { data } = await NowPaymentService.post('/invoice', {
      price_amount: amount,
      price_currency: 'usd',
      pay_currency: 'usdttrc20',
      ipn_callback_url: `${process.env.BACKEND_BASE_URL}/orders/ipn`,
      success_url: `${process.env.FRONTEND_BASE_URL}/panel/payments/success/${orderId}`,
      cancel_url: `${process.env.FRONTEND_BASE_URL}/panel/payments/failed/${orderId}`,
      is_fee_paid_by_user: false,
    });

    return data;
  }
}
