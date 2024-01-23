import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreatePostDTO, EditPostDTO, FetchPostDTO } from './post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async createPost(@Res() res, @Body() createPostData: CreatePostDTO) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.postService.createPost(createPostData));
  }

  @Put()
  async editPost(
    @Res() res,
    @Body() editPostData: EditPostDTO,
    @Query('postId') postId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.postService.editPost(postId, editPostData));
  }

  @Delete()
  async deletePost(@Res() res, @Query('postId') postId: string) {
    await this.postService.deletePost(postId);
    return res.status(HttpStatus.OK).json();
  }

  @Get()
  async getPost(@Res() res, @Query() fetchPostDTO: FetchPostDTO) {
    return res
      .status(HttpStatus.OK)
      .json(await this.postService.findAllPosts(fetchPostDTO));
  }
}
