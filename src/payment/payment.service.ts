import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { User } from 'entities/User';
import { NowPaymentService } from 'services/nowPaymentService';
import { ZarinpalService } from 'services/zarinpalService';

config();

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

  async zarinpalHandler(amount: number, user: User) {
    const requestData = {
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount: 1000,
      metadata: {
        email: user.email
      },
      description: "Transaction Description",
      callback_url: `${process.env.FRONTEND_BASE_URL}/panel/payments/verify`,
    };
    
    const { data } = await ZarinpalService.post('/request.json', requestData);

    return data.data;
  }
}
