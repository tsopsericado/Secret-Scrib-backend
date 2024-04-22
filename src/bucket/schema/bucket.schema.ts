// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { Document, HydratedDocument } from 'mongoose';
// import { Message } from 'src/message/schema/message.schema';

// export type BucketDocument = HydratedDocument<Bucket>;

// @Schema()
// export class Bucket extends Document {
//   @Prop({ required: false })
//   title: string;

//   @Prop({ required: true })
//   creator_id: string;

//   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] })
//   message_ids: Message;
// }

// export const BucketSchema = SchemaFactory.createForClass(Bucket);
