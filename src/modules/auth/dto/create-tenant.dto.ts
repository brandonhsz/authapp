import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty({ message: 'The enterprise name is required' })
  @IsString()
  enterpriseName: string;

  @IsNotEmpty({ message: 'The user name is required' })
  @IsString()
  userNames: string;

  @IsNotEmpty({ message: 'The user last name is required' })
  @IsString()
  userLastNames: string;

  @IsNotEmpty({ message: 'Invalid email address' })
  @IsEmail()
  userEmail: string;

  @IsNotEmpty({
    message: 'The phone number must be at least 10 characters long',
  })
  @IsString()
  @MinLength(10, {
    message: 'The phone number must be at least 10 characters long',
  })
  userPhone: string;

  @IsNotEmpty({ message: 'The password is required' })
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$|^.{16,}$/, {
    message:
      'The password must be at least 16 characters long OR at least 8 characters long including a number and a letter',
  })
  userPassword: string;

  @IsNotEmpty({
    message: 'The password confirmation must be at least 6 characters long',
  })
  @IsString()
  @MinLength(6, {
    message: 'The password confirmation must be at least 6 characters long',
  })
  userPasswordConfirmation: string;
}
