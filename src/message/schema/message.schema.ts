import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({ require: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Bucket', require: true })
  bucket_id: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
