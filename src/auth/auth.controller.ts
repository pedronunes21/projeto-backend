import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common'
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get("token")
    @UseGuards(AuthGuard)
    validateToken() {
        return true;
    }

    @Get("admin")
    @UseGuards(AdminGuard)
    isAdmin(@Req() req: {
        user: {
            id: string;
            email: string;
            role: number;
        }
    }) {
        return true;
    }

    @Post()
    async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto)
    }
}