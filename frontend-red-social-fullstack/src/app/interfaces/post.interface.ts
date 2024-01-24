import { User } from "./user.interface";

export interface Post {
  _id: string;
  title: string;
  content: string;
  likes: number;
  user: User;
  createdAt: Date;
}
export class PostPagination {
  title?: string;
}

