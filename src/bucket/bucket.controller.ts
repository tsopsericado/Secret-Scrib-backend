import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BucketService } from './bucket.service';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) { }

  @Post()
  async createBucket(@Body() { title, creator_id }) {
    return this.bucketService.createBucket(title, creator_id);
  }

  @Post(':bucketId/messages/:messageId')
  async addMessageToBucket(
    @Param('bucketId') bucketId: string,
    @Param('messageId') messageId: string,
  ) {
    return this.bucketService.addMessageToBucket(bucketId, messageId);
  }

  @Get()
  async getAllBuckets() {
    return this.bucketService.getBuckets();
  }

  @Get('/:id')
  async getBucketById(@Param('id') id: string) {
    return this.bucketService.getBucketById(id);
  }

  @Get('/user/:user_id')
  async getUserBuckets(@Param('user_id') user_id: string) {
    const user_buckets = await this.bucketService.getUserBuckets(user_id);

    return { buckets: user_buckets };
  }


}
