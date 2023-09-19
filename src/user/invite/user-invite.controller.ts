import { Controller, Delete, Get, Post, UseGuards, Param } from '@nestjs/common'
import { UserInviteService } from './user-invite.service';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUserInviteByIdPipe } from 'src/common/pipes/user-invite.pipe';
import { UserInvite } from '@prisma/client';

@Controller("invite/user")
export class UserInviteController {
    constructor(private userInviteService: UserInviteService) { }

    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async createInvite() {
        return this.userInviteService.createUserInvite();
    }

    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async listInvites() {
        return this.userInviteService.userInvites({
            where: {
                used: false
            }
        })
    }

    @Delete(":id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async deleteInvite(@Param("id", GetUserInviteByIdPipe) userInvite: UserInvite) {
        return this.userInviteService.deleteUserInvite(userInvite.id)
    }


}