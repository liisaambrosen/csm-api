import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schema/user.schema';

export type StreamsDocument = Stream & Document;

@Schema()
export class Stream {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: User;

  @Prop({ default: Date.now() })
  start_time: Date;

  @Prop({ type: Date, default: null })
  end_time: Date | null;
}

export const StreamsSchema = SchemaFactory.createForClass(Stream);
