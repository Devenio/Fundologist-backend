import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateChallengeDto {
  @IsNumber()
  @IsNotEmpty()
  readonly planId: string;

  @IsNumber()
  @IsNotEmpty()
  readonly fund: number;

  @IsNumber()
  readonly firstTarget: number;

  @IsNumber()
  readonly secondTarget: number;

  @IsNumber()
  readonly minimumTradingDay: number;
  
  @IsNumber()
  readonly dailyDrawdown: number;

  @IsNumber()
  readonly overallDrawdown: number;

  @IsNumber()
  readonly maximumRisk: number;

  @IsNumber()
  readonly leverage: number;

  @IsNumber()
  readonly refund: number;

  @IsNumber()
  readonly price: number;

  @IsNumber()
  readonly accountGrowthTarget: number;

  @IsNumber()
  readonly maximumAccountGrowth: number;
}
