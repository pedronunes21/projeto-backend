import { Controller, Post, UseGuards } from '@nestjs/common'
import { UserInviteService } from './user-invite.service';
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller("invite/user")
export class UserInviteController {
    constructor(private userInviteService: UserInviteService) { }

    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async createInvite() {
        return this.userInviteService.createUserInvite();
    }

}