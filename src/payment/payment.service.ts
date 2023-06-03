import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { User } from 'entities/User';
import { NowPaymentService } from 'services/nowPaymentService';
import { ZarinpalService } from 'services/zarinpalService';

config();

@Injectable()
export class PaymentService {
  async nowPaymentHandler(amount: number, orderId: number) {
    const nowPaymentsData = {
      price_amount: amount,
      price_currency: 'usd',
      pay_currency: 'usdttrc20',
      ipn_callback_url: `${process.env.BACKEND_BASE_URL}/orders/ipn`,
      success_url: `${process.env.BACKEND_BASE_URL}/orders/confirm/${orderId}`,
      cancel_url: `${process.env.BACKEND_BASE_URL}/orders/failed/${orderId}`,
      is_fee_paid_by_user: true,
    };
    console.log(nowPaymentsData);

    const { data } = await NowPaymentService.post('/invoice', nowPaymentsData);

    return data;
  }

  async zarinpalHandler(amount: number, user: User) {
    const requestData = {
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount,
      metadata: {
        email: user.email,
      },
      description: 'Transaction Description',
      callback_url: `${process.env.BACKEND_BASE_URL}/orders/verify`,
    };

    const { data } = await ZarinpalService.post('/request.json', requestData);
    return data.data;
  }

  async verifyZarinpalPayment(authority: string, amount: number) {
    const requestData = {
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount,
      authority,
    };
    try {
      const { data } = await ZarinpalService.post('/verify.json', requestData);
      console.log(data);
      return data.data;
    } catch (error) {
      console.log(JSON.stringify(error));
      return error;
    }
  }
}
