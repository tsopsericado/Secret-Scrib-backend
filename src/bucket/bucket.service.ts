import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bucket } from './schema/bucket.schema';
import { Model } from 'mongoose';

@Injectable()
export class BucketService {
  constructor(@InjectModel(Bucket.name) private bucketModel: Model<Bucket>) { }

  async createBucket(title: string, creator_id: string): Promise<Bucket> {
    const bucket = new this.bucketModel({ title, creator_id });

    return bucket.save();
  }

  async getBuckets(): Promise<Bucket[]> {
    return this.bucketModel.find().exec();
  }

  async getUserBuckets(user_id: string): Promise<Bucket[]> {
    return this.bucketModel.find({
      "creator_id": user_id,
    });
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
