import { Controller, Post, Get, Put } from '@nestjs/common';

@Controller('streams')
export class StreamsController {
  @Post()
  newStream() {
    console.log('new stream started');
  }
  @Get()
  listCurrentStreams() {
    return 'user has x streams';
  }
  @Put()
  endStream() {
    console.log('stream ended');
  }
}
