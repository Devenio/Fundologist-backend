import axios from 'axios';
import { config } from 'dotenv';

config();

export const ZarinpalService = axios.create({
  baseURL: process.env.ZARINPAL_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
