import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Department name', example: 'Computer Science' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Faculty ID (MongoDB ObjectId)', example: '670f7b3b9c8e4a2c3d4e5f6a' })
  @IsString()
  faculty: string;

  @ApiProperty({ description: 'Head of Department', example: 'Dr. John Smith' })
  @IsString()
  headOfDepartment: string;
}