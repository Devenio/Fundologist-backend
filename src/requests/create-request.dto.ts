import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { REQUEST_TYPES } from 'entities/UserRequests';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly type: REQUEST_TYPES;

  @IsString()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly accountId: string;
}
