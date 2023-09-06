import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, UserInvite } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { v4 } from 'uuid'

@Injectable()
export class UserInviteService {
    constructor(private prismaService: PrismaService) { }

    async userInvite(
        userInviteWhereUniqueInput: Prisma.UserInviteWhereInput
    ) {
        return this.prismaService.userInvite.findFirst({
            where: userInviteWhereUniqueInput
        })
    }

    async createUserInvite() {
        const inviteCode = v4()

        return this.prismaService.userInvite.create({
            data: { invite: inviteCode }
        })
    }

    async validateInvite(inviteCode: string) {
        const invite = await this.userInvite({ invite: inviteCode })
        console.log(invite)

        if (!invite || invite.used)
            throw new NotFoundException("Código inválido!")

        return invite;
    }

    async consumeInvite(invite: UserInvite) {
        return this.prismaService.userInvite.update({
            where: { id: invite.id },
            data: {
                used: true
            }
        })
    }
}