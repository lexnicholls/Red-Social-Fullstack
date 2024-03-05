import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDTO, EditPostDTO, FetchPostDTO } from './post.dto';
import { Post } from './post.schema';
import { Pagination } from 'src/model/pagination.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}
  async findAll(pagination: Pagination<FetchPostDTO>): Promise<Post[]> {
    return await this.postModel
      .find(
        { title: { $regex: pagination.data.title ?? '', $options: 'i' } },
        {},
        { limit: pagination.limit, skip: pagination.page * pagination.limit },
      )
      .populate('user')
      .sort({ createdAt: -1 });
  }
  async createPost(createPostDTO: CreatePostDTO): Promise<Post> {
    try {
      const createdPost = new this.postModel(createPostDTO);
      const userCreated = await createdPost.save();
      return await userCreated.populate('user');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async editPost(postId: string, editPostDTO: EditPostDTO) {
    const postToUpdate = await this.postModel.findById(postId);

    if (!postToUpdate) throw new NotFoundException();

    await postToUpdate.updateOne(editPostDTO);

    return postToUpdate.populate('user');
  }

  async deletePost(postId: string): Promise<void> {
    const postToDelete = await this.postModel.findById(postId);
    if (!postToDelete) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    await this.postModel.findByIdAndUpdate(postId, { deletedAt: Date.now() });
  }

  async findAllPosts(fetchPostDTO: FetchPostDTO) {
    return this.postModel
      .find({
        title: { $regex: fetchPostDTO.title ?? '', $options: 'i' },
        deletedAt: undefined,
      })
      .populate('user')
      .sort({ createdAt: -1 });
  }

  async likePost(postId: string, checked: boolean) {
    const postToLike = await this.postModel.findById(postId);
    const resPost = {
      postId,
      likes: checked ? postToLike.likes + 1 : postToLike.likes - 1,
    };
    await postToLike.updateOne(resPost);
    return resPost;
  }
}
