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
  UseGuards,
} from '@nestjs/common';
import { CreatePostDTO, EditPostDTO, FetchPostDTO } from './post.dto';
import { PostService } from './post.service';
import { UserGuard } from '../user/user.guard';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(UserGuard)
  @Post()
  async createPost(@Res() res, @Body() createPostData: CreatePostDTO) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.postService.createPost(createPostData));
  }

  @UseGuards(UserGuard)
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

  @UseGuards(UserGuard)
  @Delete()
  async deletePost(@Res() res, @Query('postId') postId: string) {
    await this.postService.deletePost(postId);
    return res.status(HttpStatus.OK).json();
  }

  @UseGuards(UserGuard)
  @Get()
  async getPost(@Res() res, @Query() fetchPostDTO: FetchPostDTO) {
    return res
      .status(HttpStatus.OK)
      .json(await this.postService.findAllPosts(fetchPostDTO));
  }

  @UseGuards(UserGuard)
  @Put('/like')
  async likeHandler(
    @Res() res,
    @Body('checked') checked: boolean,
    @Query('postId') postId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.postService.likePost(postId, checked));
  }
}
