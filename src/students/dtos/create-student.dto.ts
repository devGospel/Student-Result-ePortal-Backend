import { IsString, IsDateString, IsNumber, Min, Max, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ description: 'Unique student ID', example: 'M1902164' })
  @IsString()
  studentId: string;

  @ApiProperty({ description: 'Matriculation number', example: '2018/1/23057PT' })
  @IsString()
  matricNumber: string;

  @ApiProperty({ description: 'First name of the student', example: 'Jane' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the student', example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Date of birth (ISO format)', example: '2000-01-01' })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({ description: 'Gender', enum: ['male', 'female', 'other'], example: 'female' })
  @IsEnum(['male', 'female', 'other'])
  gender: string;

  @ApiProperty({ description: 'Email address', example: 'jane@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Phone number', example: '1234567890' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'CGPA (0 to 5.0)', example: 0 })
  @IsNumber()
  @Min(0)
  @Max(5)
  cgpa: number;

  @ApiProperty({ description: 'Department ID (MongoDB ObjectId)', example: '670f7b3b9c8e4a2c3d4e5f6a' })
  @IsString()
  department: string;

  @ApiProperty({ description: 'Academic level', example: 100 })
  @IsNumber()
  level: number;
}