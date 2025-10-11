import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Department name', example: 'Computer Science' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Faculty name', example: 'Faculty of Science' })
  @IsString()
  faculty: string;

  @ApiProperty({ description: 'Head of Department', example: 'Dr. John Smith' })
  @IsString()
  headOfDepartment: string;
}