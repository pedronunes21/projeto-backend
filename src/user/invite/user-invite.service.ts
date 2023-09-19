import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, UserInvite } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { v4 } from 'uuid'

@Injectable()
export class UserInviteService {
    constructor(private prisma: PrismaService) { }

    async userInvite(
        userInviteWhereUniqueInput: Prisma.UserInviteWhereInput
    ) {
        return this.prisma.userInvite.findFirst({
            where: userInviteWhereUniqueInput
        })
    }

    async userInvites(
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.UserInviteWhereUniqueInput;
            where?: Prisma.UserInviteWhereInput;
            orderBy?: Prisma.UserInviteOrderByWithRelationInput;
            select?: Prisma.UserInviteSelect,
        }) {

        return this.prisma.userInvite.findMany({
            ...params
        })
    }

    async createUserInvite() {
        const inviteCode = v4()

        return this.prisma.userInvite.create({
            data: { invite: inviteCode }
        })
    }

    async deleteUserInvite(id: string) {
        return this.prisma.userInvite.delete({
            where: { id }
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
        return this.prisma.userInvite.update({
            where: { id: invite.id },
            data: {
                used: true
            }
        })
    }
}