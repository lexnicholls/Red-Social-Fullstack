import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true})
    fullName: string;
    @Prop({required: true})
    age: number;
    @Prop({required: true})
    email: string;
    @Prop({required: true})
    password: string;
    @Prop({default: Date.now})
    createdAt: Date;
    @Prop({default: Date.now})
    updatedAt: Date;
    @Prop({default: Date.now})
    deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);