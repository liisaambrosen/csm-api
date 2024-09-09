import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StreamsModule } from './streams/streams.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.URL}:${process.env.PORT}/concurrent_streaming_manager`,
    ),
    UserModule,
    StreamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
