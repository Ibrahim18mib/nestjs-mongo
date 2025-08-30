import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from 'src/Schemas/posts.schema';
import { CreatePostDto } from './Dto/createpost.dto';
import { User } from 'src/Schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private PostModel: Model<Posts>,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {}

  async createPost({ userId, ...createPostReq }: CreatePostDto) {
    const findUser = await this.UserModel.findById(userId);

    if (!findUser) throw new HttpException('User not Found', 404);
    const newPost = new this.PostModel(createPostReq);

    const savedPost = await newPost.save();
    await findUser.updateOne({
      $push: {
        posts: savedPost._id,
      },
    });
    return savedPost;
  }

  findPostById(id: string) {
    return this.PostModel.findById(id);
  }
}
