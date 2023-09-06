import { User } from "@prisma/client";
import { UserService } from "./user.service";
import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { CreateUserDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get(":id")
    async getUser(
        @Param("id") id: string
    ): Promise<User | null> {
        return this.userService.user({ id })
    }

    @Get()
    async getUsers() {
        return this.userService.users({});
    }

    @Post()
    createUser(
        @Body() createUserDto: CreateUserDto,
        @Query("invite") inviteCode: string
    ): Promise<User> {

        return this.userService.createUser(createUserDto, inviteCode)

    }

    // DESATIVAR ESSA ROTA EM PRODUÇÃO
    @Post("admin")
    createAdmin(
        @Body() createUserDto: CreateUserDto,
    ): Promise<User> {

        return this.userService.createAdmin(createUserDto)

    }

}