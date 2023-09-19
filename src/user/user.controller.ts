import { User } from "@prisma/client";
import { UserService } from "./user.service";
import { Controller, Post, Body, Get, Param, Query, Put, UseGuards, Req, Delete } from '@nestjs/common';
import { CreateUserDto, DeleteUserDto, UpdateUserDto } from "./dto/user.dto";
import { GetUserByIdPipe } from "src/common/pipes/user.pipe";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("me")
    @UseGuards(AuthGuard)
    async getMe(@Req() req: {
        user: {
            id: string;
            email: string;
            role: number;
        }
    }): Promise<User | null> {
        return this.userService.user({ id: req.user.id })
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    async getUser(
        @Param("id") id: string
    ): Promise<User | null> {
        return this.userService.user({ id })
    }

    @Get()
    @UseGuards(AuthGuard)
    async getUsers() {
        return this.userService.users({});
    }

    @Post()
    async createUser(
        @Body() createUserDto: CreateUserDto,
        @Query("invite") inviteCode: string
    ): Promise<User> {

        return this.userService.createUser(createUserDto, inviteCode)

    }

    @Delete(":id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async deleteUser(
        @Param("id", GetUserByIdPipe) user: User,
        @Param() deleteUserDto: DeleteUserDto
    ) {
        return this.userService.deleteUser(user.id)
    }

    @Put()
    @UseGuards(AuthGuard)
    async updateUser(
        @Req() req: {
            user: {
                id: string;
                email: string;
                role: number;
            }
        },
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        const { birthDate, email, name, password } = updateUserDto
        return this.userService.updateUser({
            birthDate,
            email,
            id: req.user.id,
            name,
            password,
        })

    }

    // DESATIVAR ESSA ROTA EM PRODUÇÃO
    @Post("admin")
    async createAdmin(
        @Body() createUserDto: CreateUserDto,
    ): Promise<User> {

        return this.userService.createAdmin(createUserDto)

    }

}