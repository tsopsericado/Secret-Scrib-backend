import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Message } from 'src/message/schema/message.schema';

export type BucketDocument = HydratedDocument<Bucket>;

@Schema()
export class Bucket extends Document {
  @Prop({ required: true }) 
  title: string;

  @Prop({ required: true })
  creator: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] })
  message_ids: Message;
}

export const BucketSchema = SchemaFactory.createForClass(Bucket);
