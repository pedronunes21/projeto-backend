import { Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { UserInviteService } from "src/user/invite/user-invite.service";

@Injectable()
export class GetUserInviteByIdPipe implements PipeTransform<string, any> {

    constructor(private userInviteService: UserInviteService) { }

    async transform(value: string) {

        if (!value)
            return null;

        value = String(value)
        const userInviteId = value

        const userInvite = await this.userInviteService.userInvite({
            id: userInviteId
        })

        if (userInvite === null)
            throw new NotFoundException("Convite não encontrado!")

        return userInvite;
    }
}