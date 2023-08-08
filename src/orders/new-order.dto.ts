import { isEnum, IsString, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { PLATFORMS } from 'entities/UserOrders';

export enum PAYMENT_TYPES {
  NOW_PAYMENT = 'NOW_PAYMENT',
  ZARINPAL = 'ZARINPAL',
  USDT_WALLET = 'USDT_WALLET'
}

export class NewOrderDto {
  @IsNumber()
  @IsNotEmpty()
  readonly challengeId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly serverId: number;

  @IsNotEmpty()
  readonly platform: PLATFORMS;

  @IsEnum(PAYMENT_TYPES)
  @IsNotEmpty()
  readonly paymentType: PAYMENT_TYPES;

  @IsString()
  @IsOptional()
  readonly discountCode: string;
}
