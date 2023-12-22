import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schema/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async createMessage(content: string, bucket_id: string): Promise<Message> {
    const message = new this.messageModel({ content, bucket_id });
    return message.save();
  }

  async getMessage(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async getMessageById(id: string): Promise<any> {
    console.log('message', id);
    return this.messageModel.find({ bucket_id: id });
  }
}
