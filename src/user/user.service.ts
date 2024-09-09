import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(username: string, streamsLimit: number): Promise<User> {
    if (streamsLimit <= 0) {
      throw new Error('streamsLimit must be a positive number');
    }

    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) throw new Error('Username already exists');

    const user = new this.userModel({ username, streams_limit: streamsLimit });
    return user.save();
  }

  async userById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new Error(`There is no user with id: ${id}`);
    return user;
  }
}
