import { IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ description: 'Course code', example: 'CS101' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Course title', example: 'Introduction to Computer Science' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Credit units', example: 3 })
  @IsNumber()
  creditUnits: number;

  @ApiProperty({ description: 'Course type', enum: ['core', 'elective'], example: 'core' })
  @IsEnum(['core', 'elective'])
  type: string;

  @ApiProperty({ description: 'Department ID (MongoDB ObjectId)', example: '670f7b3b9c8e4a2c3d4e5f6a' })
  @IsString()
  department: string;

  @ApiProperty({ description: 'Academic level', example: 100 })
  @IsNumber()
  level: number;
}