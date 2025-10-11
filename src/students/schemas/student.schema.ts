import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Department } from '../../departments/schemas/department.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Student extends Document {
  @ApiProperty({ description: 'Unique student ID', example: 'M1902164' })
  @Prop({ required: true, unique: true })
  studentId: string;

  @ApiProperty({ description: 'Matriculation number', example: '2018/1/23057PT' })
  @Prop({ required: true, unique: true })
  matricNumber: string;

  @ApiProperty({ description: 'First name', example: 'Jane' })
  @Prop({ required: true })
  firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({ description: 'Date of birth', example: '2000-01-01' })
  @Prop()
  dateOfBirth: Date;

  @ApiProperty({ description: 'Gender', example: 'female' })
  @Prop()
  gender: string;

  @ApiProperty({ description: 'Email address', example: 'jane@example.com' })
  @Prop()
  email: string;

  @ApiProperty({ description: 'Phone number', example: '1234567890' })
  @Prop()
  phone: string;

  @ApiProperty({ description: 'CGPA (0 to 5.0)', example: 4.5 })
  @Prop({ required: true, min: 0, max: 5.0 })
  cgpa: number;

  @ApiProperty({ description: 'Department ID (MongoDB ObjectId)', example: '670f7b3b9c8e4a2c3d4e5f6a' })
  @Prop({ type: Types.ObjectId, ref: 'Department', required: true })
  department: Types.ObjectId;

  @ApiProperty({ description: 'Academic level', example: 100 })
  @Prop()
  level: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);