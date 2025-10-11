import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Department } from '../../departments/schemas/department.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Course extends Document {
  @ApiProperty({ description: 'Course code', example: 'CS101' })
  @Prop({ required: true, unique: true })
  code: string;

  @ApiProperty({ description: 'Course title', example: 'Introduction to Computer Science' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Credit units', example: 3 })
  @Prop({ required: true })
  creditUnits: number;

  @ApiProperty({ description: 'Course type', enum: ['core', 'elective'], example: 'core' })
  @Prop({ required: true, enum: ['core', 'elective'] })
  type: string;

  @ApiProperty({ description: 'Department ID (MongoDB ObjectId)', example: '670f7b3b9c8e4a2c3d4e5f6a' })
  @Prop({ type: Types.ObjectId, ref: 'Department', required: true })
  department: Types.ObjectId;

  @ApiProperty({ description: 'Academic level', example: 100 })
  @Prop()
  level: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);