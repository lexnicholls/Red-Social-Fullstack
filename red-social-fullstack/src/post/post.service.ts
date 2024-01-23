import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDTO, EditPostDTO, FetchPostDTO } from './post.dto';
import { Post } from './post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async createPost(createPostDTO: CreatePostDTO): Promise<Post> {
    try {
      const createdPost = new this.postModel(createPostDTO);
      return createdPost.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async editPost(postId: string, editPostDTO: EditPostDTO): Promise<Post> {
    const postToUpdate = await this.postModel.findByIdAndUpdate(
      postId,
      editPostDTO,
      { new: true },
    );
    // if(postToUpdate.userId !== userId){
    //   throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
    // }
    return postToUpdate;
  }

  async deletePost(postId: string): Promise<void> {
    const postToDelete = await this.postModel.findById(postId);
    if(!postToDelete){
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
    // if(postToUpdate.userId !== userId){
    //   throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
    // }
    await this.postModel.findByIdAndUpdate(
      postId,
      { deletedAt: Date.now() }
    );
  }

  async findAllPosts(fetchPostDTO: FetchPostDTO) {
    return this.postModel.find({
      title: { $regex: fetchPostDTO.title ?? '', $options: 'i' },
      deletedAt: undefined,
    });
  }
}
