import { isEnum, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PLATFORMS } from 'entities/UserOrders';

export enum PAYMENT_TYPES {
  NOW_PAYMENT = 'NOW_PAYMENT',
  ZARINPAL = 'ZARINPAL',
}

export class NewWithdrawDto {
  @IsString()
  @IsNotEmpty()
  readonly walletAddress: string;

  @IsNumber()
  @IsNotEmpty()
  readonly accountId: number;

  // @IsString()
  // readonly description: PLATFORMS;
}
