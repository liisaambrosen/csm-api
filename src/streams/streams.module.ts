import { Module } from '@nestjs/common';
import { StreamsService } from './streams.service';
import { StreamsController } from './streams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stream, StreamsSchema } from './schema/streams.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Stream.name, schema: StreamsSchema }]),
  ],
  providers: [StreamsService],
  controllers: [StreamsController],
})
export class StreamsModule {}
