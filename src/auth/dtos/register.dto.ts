import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email address of the user', example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password (minimum 6 characters)', example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;
}