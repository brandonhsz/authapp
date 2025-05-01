import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'The email address is not valid' })
  email: string;

  @IsNotEmpty({ message: 'The password cannot be empty' })
  password: string;
}
