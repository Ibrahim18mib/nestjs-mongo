import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Query,
  Param,
  HttpException,
  HttpStatus,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './Dto/createusers.dto';
import { UsersService } from './users.service';
import mongoose from 'mongoose';
import { UpdateUserDto } from './Dto/updateuser.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  //CREATE
  @Post()
  //   @UsePipes(new ValidationPipe())
  createNewUser(@Body() createUserReq: CreateUserDto) {
    console.log('createUserDto', createUserReq);

    return this.userService.createUser(createUserReq);
  }

  //READ
  @Get()
  getUsersLists() {
    return this.userService.getUsers();
  }

  //get by id users/:id
  @Get(':id')
  async getUserById(@Param('id') reqId: string) {
    const isIdValid = mongoose.Types.ObjectId.isValid(reqId);

    if (!isIdValid) throw new HttpException('User not Found', 404);

    const fetchedUser = await this.userService.getUserById(reqId);
    if (!fetchedUser) throw new HttpException('User not Found', 404);

    return fetchedUser;
  }

  //@PUT -> helps to update the entire object.

  //@Patch ->  helps to update the given param update and will not involve others
  @Patch(':id')
  async updateUserById(
    @Param('id') reqId: string,
    @Body() updateUserReq: UpdateUserDto,
  ) {
    const isIdValid = mongoose.Types.ObjectId.isValid(reqId);

    if (!isIdValid) throw new HttpException('Invalid User', 400);

    const updatedUser = await this.userService.updateUserById(
      reqId,
      updateUserReq,
    );

    if (!updatedUser) throw new HttpException('Invalid User', 400);
    return updatedUser;
  }

  //DELETE
  @Delete(':id')
  async deleteUserById(@Param('id') reqId: string) {
    const isIdValid = mongoose.Types.ObjectId.isValid(reqId);

    if (!isIdValid) throw new HttpException('Invalid User', 400);

    const deletedUser = await this.userService.deleteUserById(reqId);

    if (!deletedUser) throw new HttpException('Invalid User', 400);

    return { message: 'REcord has been deleted successfully' };
  }
}
