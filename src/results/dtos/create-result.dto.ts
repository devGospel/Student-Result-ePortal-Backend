import { IsString, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResultDto {
  @ApiProperty({ description: 'Student ID (MongoDB ObjectId)', example: '670f7b3b9c8e4a2c3d4e5f6b' })
  @IsString()
  studentId: string;

  @ApiProperty({ description: 'Course ID (MongoDB ObjectId)', example: '670f7b3b9c8e4a2c3d4e5f6c' })
  @IsString()
  courseCode: string;

  @ApiProperty({ description: 'Score (0 to 100)', example: 85 })
  @IsNumber()
  @Min(0)
  @Max(100)
  score: number;

  @ApiProperty({ description: 'Semester', example: 'First' })
  @IsString()
  semester: string;

  @ApiProperty({ description: 'Academic session', example: '2024/2025' })
  @IsString()
  session: string;
}