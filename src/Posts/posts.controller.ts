import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './Dto/createpost.dto';
import mongoose from 'mongoose';

@Controller('posts')
export class PostController {
  constructor(private postService: PostsService) {}

  //CREATE
  @Post()
  //   @UsePipes(new ValidationPipe())
  createNewPost(@Body() createPostReq: CreatePostDto) {
    console.log('createPostReq', createPostReq);

    return this.postService.createPost(createPostReq);
  }

  //By ID
  @Get(':id')
  async findPostsById(@Param('id') postId: string) {
    const isIdValid = mongoose.Types.ObjectId.isValid(postId);

    if (!isIdValid) throw new HttpException('Posts not Found', 404);
    const fetchedPosts = await this.postService.findPostById(postId);
    if (!fetchedPosts) throw new HttpException('Posts not Found', 404);

    return fetchedPosts;
  }
}
