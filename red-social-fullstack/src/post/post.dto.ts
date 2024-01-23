import { User } from 'src/user/user.schema';

export interface CreatePostDTO {
  title: string;
  content: string;
  likes: number;
  userId: User;
}

export interface EditPostDTO {
  title: string;
  content: string;
  likes: number;
  userId: User;
}

export interface DeletePostDTO {
  postId: string;
}

export interface FetchPostDTO {
  title: string;
}
