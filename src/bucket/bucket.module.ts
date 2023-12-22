import { Module } from '@nestjs/common';
import { BucketController } from './bucket.controller';
import { BucketService } from './bucket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bucket, BucketSchema } from './schema/bucket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bucket.name,
        schema: BucketSchema,
      },
    ]),
  ],

  controllers: [BucketController],
  providers: [BucketService],
})
export class BucketModule {}
