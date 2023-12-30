import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bucket } from './schema/bucket.schema';
import { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class BucketService {
  constructor(@InjectModel(Bucket.name) private bucketModel: Model<Bucket>) { }

  async createBucket(title: string, creator: User): Promise<Bucket> {
    const bucket = new this.bucketModel({ title, creator });
    console.log({ bucket, creator })
    return bucket.save();
  }

  async getBuckets(): Promise<Bucket[]> {
    return this.bucketModel.find().exec();
  }

  async getBucketById(id: string): Promise<Bucket> {
    return this.bucketModel.findById(id).exec();
  }

  async addMessageToBucket(
    bucketId: string,
    messageId: string,
  ): Promise<Bucket> {
    return this.bucketModel
      .findByIdAndUpdate(
        bucketId,
        { $push: { message_ids: messageId } },
        { new: true },
      )
      .exec();
  }
}
