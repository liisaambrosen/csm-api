import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stream, StreamsDocument } from './schema/streams.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StreamsService {
  constructor(
    @InjectModel(Stream.name) private streamModel: Model<StreamsDocument>,
    private readonly userService: UserService,
  ) {}

  async countCurrentStreamsByUserId(userId: string): Promise<number> {
    return this.streamModel
      .countDocuments({
        user_id: userId,
        end_time: null,
      })
      .exec();
  }

  async newStream(userId: string): Promise<Stream> {
    const user = await this.userService.userById(userId);
    if (!user) throw new Error('User not found');
    const currentStreamNumber = await this.countCurrentStreamsByUserId(userId);
    if (currentStreamNumber >= user.streams_limit) {
      throw new Error('You have reached stream limit');
    }
    const stream = new this.streamModel({ user_id: userId });
    return stream.save();
  }

  async endStream(id: string): Promise<Stream> {
    const stream = await this.streamModel.findById(id).exec();
    if (!stream) throw new Error('Stream not found');
    if (stream.end_time) throw new Error('Stream has already ended');
    stream.end_time = new Date();
    return stream.save();
  }
}
