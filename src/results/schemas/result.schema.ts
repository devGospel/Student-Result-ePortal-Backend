import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Student } from '../../students/schemas/student.schema';
import { Course } from '../../courses/schemas/course.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Result extends Document {
  @ApiProperty({ description: 'Student ID (MongoDB ObjectId)', example: '670f7b3b9c8e4a2c3d4e5f6b' })
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @ApiProperty({ description: 'Course ID (MongoDB ObjectId)', example: '670f7b3b9c8e4a2c3d4e5f6c' })
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseCode: Types.ObjectId;

  @ApiProperty({ description: 'Score (0 to 100)', example: 85 })
  @Prop({ required: true, min: 0, max: 100 })
  score: number;

  @ApiProperty({ description: 'Semester', example: 'First' })
  @Prop({ required: true })
  semester: string;

  @ApiProperty({ description: 'Academic session', example: '2024/2025' })
  @Prop({ required: true })
  session: string;

  @ApiProperty({ description: 'Grade', example: 'A' })
  @Prop()
  grade: string;
}

export const ResultSchema = SchemaFactory.createForClass(Result);