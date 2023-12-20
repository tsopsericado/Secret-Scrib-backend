import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(@Body() body): Promise<any> {
    const { content, sender } = body;

    const message = await this.messageService.createMessage(content, sender);
    return { message };
  }

  @Get()
  async getMessage(): Promise<any> {
    const message = await this.messageService.getMessage();
    return { message };
  }
}
