import { User } from 'src/user/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDTO {
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  likes: number;
  @ApiProperty()
  userId: User;
}

export class EditPostDTO {
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  likes: number;
  @ApiProperty()
  userId: User;
}

export class DeletePostDTO {
  @ApiProperty()
  postId: string;
}

export class FetchPostDTO {
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  likes: number;
  @ApiProperty()
  userId: User;
}
