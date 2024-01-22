import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDTO, LoginUserDTO } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post("/register")
    async createUser(@Res() res, @Body() createUserData: CreateUserDTO) {
        try {
            return res.status(HttpStatus.CREATED).json(await this.userService.createUser(createUserData));
        } catch (error) {
            console.log(error)
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message
            });
        }
    }

    @Post("/auth")
    async login(@Res() res, @Body() loginUserData: LoginUserDTO) {
        const user = await this.userService.loginUser(loginUserData);
        if (!user) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: 'USER NOT FOUND'
            });
        }
        return res.status(HttpStatus.FOUND).json();
    }

}
