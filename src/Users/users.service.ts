import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Schemas/user.schema';
import { CreateUserDto } from './Dto/createusers.dto';
import { UpdateUserDto } from './Dto/updateuser.dto';
import { UserSetting } from 'src/Schemas/usersettings.schema';
import { Posts } from 'src/Schemas/posts.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSetting.name)
    private userSettingsModel: Model<UserSetting>,
  ) {}

  async createUser({ settings, ...createUserReq }: CreateUserDto) {
    if (settings) {
      const newUserSetting = new this.userSettingsModel(settings);
      const savedUserSetting = await newUserSetting.save();

      const newUser = new this.userModel({
        ...createUserReq,
        settings: savedUserSetting._id,
      });

      return newUser.save();
    }

    const newUser = new this.userModel(createUserReq);
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find().populate(['settings', 'posts']);
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate('settings');
  }

  updateUserById(id: string, updateUserReq: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserReq, { new: true });
  }

  deleteUserById(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
