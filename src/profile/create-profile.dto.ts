import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PLATFORMS } from 'entities/UserOrders';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  readonly nationalId: string;

  @IsString()
  @IsNotEmpty()
  readonly birthday: string;
}
