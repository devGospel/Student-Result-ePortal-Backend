import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Department extends Document {
  @ApiProperty({ description: 'Department name', example: 'Computer Science' })
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty({ description: 'Faculty name', example: 'Faculty of Science' })
  @Prop()
  faculty: string;

  @ApiProperty({ description: 'Head of Department', example: 'Dr. John Smith' })
  @Prop()
  headOfDepartment: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);