import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Faculty extends Document {
  @ApiProperty({ description: 'Faculty name', example: 'Faculty of Science' })
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty({ description: 'Dean of Faculty', example: 'Prof. Jane Doe' })
  @Prop()
  dean?: string;
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);


