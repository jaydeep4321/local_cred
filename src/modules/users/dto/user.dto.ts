import { IsNotEmpty, MinLength, IsEmail, MaxLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(10)
  readonly phone: string;
}
