import {
  Controller,
  Post,
  Patch,
  Res,
  Body,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { NewStreamDto } from './dto/new-stream.dto';
import { StreamsService } from './streams.service';

@Controller('streams')
export class StreamsController {
  constructor(private readonly streamsService: StreamsService) {}

  @Post()
  async newStream(@Body() newStreamDto: NewStreamDto, @Res() response) {
    try {
      const newStream = await this.streamsService.newStream(
        newStreamDto.userId,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Stream started successfully',
        newStream,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Could not start stream: ${err.message}`,
      });
    }
  }

  @Patch(':id/end')
  async endStream(@Param('id') id: string, @Res() response) {
    try {
      const endStream = await this.streamsService.endStream(id);
      return response.status(HttpStatus.OK).json({
        message: 'Stream ended successfully',
        endStream,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Could not end stream: ${err.message}`,
      });
    }
  }
}
