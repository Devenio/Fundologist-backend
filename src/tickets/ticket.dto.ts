import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

export enum TICKET_STATUSES {
  OPEN = 'open',
  CLOSED = 'closed',
}
