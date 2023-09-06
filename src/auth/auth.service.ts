import { Get, Injectable, NotFoundException, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UserService } from "src/user/user.service";
import { AuthGuard } from "./auth.guard";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(data: { email: string, password: string }) {
        const { email, password } = data;
        const user = await this.userService.user({ email })

        if (user === null) {
            throw new NotFoundException("Esse usuário não existe!")
        }

        if (await compare(password, user.password)) {
            const payload = { id: user.id, email: user.email, role: user.role }

            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        } else {
            throw new UnauthorizedException("Usuário inválido");
        }
    }
}