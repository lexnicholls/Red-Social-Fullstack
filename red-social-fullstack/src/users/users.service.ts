import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, LoginUserDTO } from './users.dto';
import { User } from './users.schema';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private readonly usersModel: Model<User>) { }

    async createUser(createUserDTO: CreateUserDTO) : Promise<User>{
        const createdUser = new this.usersModel(createUserDTO);
        return createdUser.save()
    }
    async loginUser(loginUserDTO: LoginUserDTO) : Promise<User>{
        return this.usersModel.findOne(loginUserDTO);
    }
}
