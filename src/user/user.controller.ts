import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
    @Res() response,
  ) {
    try {
      const newUser = await this.userService.register(
        registerUserDto.username,
        registerUserDto.streams_limit,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'User registered successfully',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Could not register user: ${err.message}`,
      });
    }
  }
  @Get(':id')
  getUser(@Param() params) {
    return `user ${params.id}`;
  }
  @Put()
  updateUserLimit() {
    console.log('limit of streams updated');
  }
  @Delete()
  deleteUser() {
    console.log('user was deleted');
  }
}
