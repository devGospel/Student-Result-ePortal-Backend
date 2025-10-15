import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Department extends Document {
  @ApiProperty({ description: 'Department name', example: 'Computer Science' })
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty({ description: 'Faculty ID', example: '670f7b3b9c8e4a2c3d4e5f6a' })
  @Prop({ type: Types.ObjectId, ref: 'Faculty', required: true })
  faculty: Types.ObjectId;

  @ApiProperty({ description: 'Head of Department', example: 'Dr. John Smith' })
  @Prop()
  headOfDepartment: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);