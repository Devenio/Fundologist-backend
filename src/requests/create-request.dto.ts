import { IsNotEmpty, IsString } from 'class-validator';
import { REQUEST_TYPES } from 'entities/UserRequests';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly type: REQUEST_TYPES;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
