import { Injectable, BadRequestException } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { genSalt, hash } from "bcrypt";
import { PrismaService } from "src/database/prisma.service";
import { UserInviteService } from "./invite/user-invite.service";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private userInviteService: UserInviteService
    ) { }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput
        })
    }

    async users(
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.UserWhereUniqueInput;
            where?: Prisma.UserWhereInput;
            orderBy?: Prisma.UserOrderByWithRelationInput;
            select?: Prisma.UserSelect,
        }) {

        return this.prisma.user.findMany({
            ...params, select: {
                id: true,
                email: true,
                role: true,
                ...params.select,
                password: false,
            }
        })
    }

    async createUser(data: Prisma.UserCreateInput, inviteCode: string): Promise<User> {

        const invite = await this.userInviteService.validateInvite(inviteCode)
        console.log(invite)

        const { email, password } = data;
        const salt = await genSalt()

        const hashedPassword = await hash(password, salt);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                }
            })
            await this.userInviteService.consumeInvite(invite)
            return user;
        } catch (err) {
            if (err.meta.target[0] === "email")
                throw new BadRequestException("Email já cadastrado")
            else
                throw new BadRequestException("Ocorreu algum erro!")
        }
    }

    async createAdmin(data: Prisma.UserCreateInput): Promise<User> {

        const { email, password } = data;
        const salt = await genSalt()

        const hashedPassword = await hash(password, salt);

        try {
            const user = await this.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: 1
                }
            })
            return user;
        } catch (err) {
            if (err.meta.target[0] === "email")
                throw new BadRequestException("Email já cadastrado")
            else
                throw new BadRequestException("Ocorreu algum erro!")
        }
    }
}