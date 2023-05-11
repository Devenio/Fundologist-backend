import axios from 'axios';
import { config } from 'dotenv';

config();

export const WallexService = axios.create({
  baseURL: process.env.WALLEX_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.WALLEX_API_KEY
  }
});
