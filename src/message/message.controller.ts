import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(@Body() { content, sender }) {
    const message = await this.messageService.createMessage(content, sender);
    return { message };
  }

  @Get()
  async getMessage() {
    const message = await this.messageService.getMessage();
    return { message };
  }

  @Get(':id')
  async getMessageById(@Param('id') id: string) {
    const message = this.messageService.getMessageById(id);
    return { message };
  }
}
