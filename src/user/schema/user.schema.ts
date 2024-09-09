import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  streams_limit: number;

  @Prop({ default: Date.now() })
  created_date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
