import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { User } from 'src/user/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  content: string;
  @Prop({ default: 0 })
  likes: number;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;
  @Prop()
  deletedAt: Date;
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
