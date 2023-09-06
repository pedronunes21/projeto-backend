import { Module, Global } from '@nestjs/common'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { UserInviteModule } from 'src/user/invite/user-invite.module';
import { UserInviteService } from 'src/user/invite/user-invite.service';

@Global()
@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "7d" }
        }),
        UserInviteModule
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, AuthGuard, UserInviteService],
})
export class AuthModule { }