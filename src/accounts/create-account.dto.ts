import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ACCOUNT_LEVELS } from 'entities/UserAccounts';
import { PLATFORMS } from 'entities/UserOrders';

export class NewAccountDto {
  @IsEnum(PLATFORMS)
  @IsNotEmpty()
  readonly platform: PLATFORMS;

  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly investorPassword: string;

  @IsEnum(ACCOUNT_LEVELS)
  @IsNotEmpty()
  readonly level: ACCOUNT_LEVELS;

  @IsNumber()
  @IsNotEmpty()
  readonly serverId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly challengeId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}
