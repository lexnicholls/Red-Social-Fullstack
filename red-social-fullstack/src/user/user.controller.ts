import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async createUser(@Res() res, @Body() createUserData: UserDTO) {
    try {
      return res
        .status(HttpStatus.CREATED)
        .json(await this.userService.createUser(createUserData));
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Post('/auth')
  async login(@Res() res, @Body() loginUserData: UserDTO) {
    const user = await this.userService.loginUser(loginUserData);
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'USER NOT FOUND',
      });
    }
    return res.status(HttpStatus.OK).json(user);
  }

  @UseGuards(UserGuard)
  @Put()
  async editUser(
    @Res() res,
    @Body() editUserData: UserDTO,
    @Query('userId') userId: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.editUser(userId, editUserData));
  }

  @UseGuards(UserGuard)
  @Get()
  async getUser(@Res() res, @Query('id') userId: string) {
    const user = await this.userService.fetchUser(userId);
    return res.status(HttpStatus.OK).json(user);
  }
}
