import {
  Controller,
  Post,
  Get,
  Put,
  Res,
  Body,
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
  @Get()
  listCurrentStreams() {
    return 'user has x streams';
  }
  @Put()
  endStream() {
    console.log('stream ended');
  }
}

// async registerUser(
//   @Body() registerUserDto: RegisterUserDto,
//   @Res() response,
// ) {
//   try {
//     const newUser = await this.userService.register(
//       registerUserDto.username,
//       registerUserDto.streams_limit,
//     );
//     return response.status(HttpStatus.CREATED).json({
//       message: 'User registered successfully',
//       newUser,
//     });
//   } catch (err) {
//     return response.status(HttpStatus.BAD_REQUEST).json({
//       message: `Could not register user: ${err.message}`,
//     });
//   }
// }
