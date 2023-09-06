import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get("token")
    @UseGuards(AuthGuard)
    validateToken() {
        return true;
    }

    @Post()
    async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto)
    }
}