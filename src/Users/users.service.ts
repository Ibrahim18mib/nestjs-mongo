import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Schemas/user.schema';
import { CreateUserDto } from './Dto/createusers.dto';
import { UpdateUserDto } from './Dto/updateuser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUserReq: CreateUserDto) {
    const newUser = new this.userModel(createUserReq);
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find();
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  updateUserById(id: string, updateUserReq: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserReq, { new: true });
  }

  deleteUserById(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
