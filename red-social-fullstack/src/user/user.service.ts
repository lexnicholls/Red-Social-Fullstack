import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './user.dto';
import { User } from './user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDTO: UserDTO): Promise<User> {
    const createdUser = new this.userModel(createUserDTO);
    return createdUser.save();
  }
  async loginUser(loginUserDTO: UserDTO) {
    const user = await this.userModel.findOne(loginUserDTO);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async editUser(userId: string, editUserDTO: UserDTO) {
    const userToUpdate = await this.userModel.findById(userId);

    if (!userToUpdate) throw new NotFoundException();

    await userToUpdate.updateOne(editUserDTO);

    return userToUpdate;
  }

  async fetchUser(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException();
    return user;
  }
}
