import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Email address', example: 'john@example.com' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'Hashed password', example: '$2b$10$...' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'Role of the user', example: 'user', enum: ['user', 'admin'] })
  @Prop({ required: true, enum: ['user', 'admin'], default: 'user' })
  role: 'user' | 'admin';

  // Mongoose automatically adds _id, but we need to declare it for TypeScript
  _id: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);