import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    addUser(@Body('name') username: string) {
        this.usersService.insertUser(username);

        return { message: 'کاربر با موفقیت ذخیره شد' }
    }
}