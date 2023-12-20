import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schema/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async createMessage(content: string, sender: string): Promise<Message> {
    const message = new this.messageModel({ content, sender });
    return message.save();
  }

  async getMessage(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async getMessageById(id: string): Promise<Message> {
    return this.messageModel.findById(id).exec();
  }
}
