import axios from 'axios';
import { config } from 'dotenv';

config();

export const NowPaymentService = axios.create({
  baseURL: process.env.NOW_PAYMENT_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NOW_PAYMENT_API_KEY,
  },
  maxBodyLength: Infinity,
});
