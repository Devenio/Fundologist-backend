import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly phone: string;

  @IsEmail()
  readonly email: string;
}
