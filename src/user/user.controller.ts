import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post()
  registerUser() {
    console.log('user is registered');
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
