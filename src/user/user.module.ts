import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserInviteModule } from "./invite/user-invite.module";
import { UserInviteService } from "./invite/user-invite.service";

@Module({
    imports: [UserInviteModule],
    controllers: [UserController],
    providers: [UserService, UserInviteService]
})
export class UserModule { }