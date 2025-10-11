import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ 
    example: 'John Doe', 
    description: 'Full name of the user' 
  })
  @IsString()
  name: string;

  @ApiProperty({ 
    example: 'john@example.com', 
    description: 'Email address of the user' 
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    example: 'password123', 
    description: 'Password (minimum 6 characters)' 
  })
  @IsString()
  @MinLength(6)
  password: string;
}