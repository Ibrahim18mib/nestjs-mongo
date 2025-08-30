import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchemas } from 'src/Schemas/posts.schema';
import { PostController } from './posts.controller';
import { PostsService } from './posts.service';
import { User, UserSchemas } from 'src/Schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Posts.name,
        schema: PostSchemas,
      },
      {
        name: User.name,
        schema: UserSchemas,
      },
    ]),
  ],
  providers: [PostsService],
  controllers: [PostController],
})
export class PostModule {}
