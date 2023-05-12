import axios from 'axios';
import { config } from 'dotenv';

config();

export const NobitexService = axios.create({
  baseURL: process.env.NOBITEX_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
