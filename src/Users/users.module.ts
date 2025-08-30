import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchemas } from 'src/Schemas/user.schema';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import {
  UserSetting,
  UserSettingSchemas,
} from 'src/Schemas/usersettings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchemas,
      },
      {
        name: UserSetting.name,
        schema: UserSettingSchemas,
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UserController],
})
export class UserModule {}
