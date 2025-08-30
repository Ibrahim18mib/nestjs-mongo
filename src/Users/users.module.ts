import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchemas } from 'src/Schemas/user.schema';
import { UsersService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchemas,
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UserController],
})
export class UserModule {}
