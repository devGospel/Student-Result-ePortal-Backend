import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFacultyDto {
  @ApiProperty({ description: 'Faculty name', example: 'Faculty of Science' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Dean of Faculty', example: 'Prof. Jane Doe', required: false })
  @IsOptional()
  @IsString()
  dean?: string;
}


