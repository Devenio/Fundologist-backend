import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PLATFORMS } from 'entities/UserOrders';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  readonly nationalId: string;

  @IsDateString()
  @IsNotEmpty()
  readonly birthday: string;
}
