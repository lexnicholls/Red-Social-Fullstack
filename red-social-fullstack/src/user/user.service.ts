import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, LoginUserDTO } from './user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async createUser(createUserDTO: CreateUserDTO) : Promise<User>{
        const createdUser = new this.userModel(createUserDTO);
        return createdUser.save()
    }
    async loginUser(loginUserDTO: LoginUserDTO) : Promise<User>{
        return this.userModel.findOne(loginUserDTO);
    }
}
