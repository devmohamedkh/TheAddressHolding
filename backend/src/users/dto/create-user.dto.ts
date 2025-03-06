import { ApiProperty } from '@nestjs/swagger';
import { IsEmail ,IsNotEmpty,IsStrongPassword, } from 'class-validator';

export class CreateUserRequest {
  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols:1
  })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
