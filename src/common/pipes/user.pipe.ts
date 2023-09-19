import { Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class GetUserByIdPipe implements PipeTransform<string, any> {

    constructor(private userService: UserService) { }

    async transform(value: string) {

        if (!value)
            return null;

        value = String(value)
        const userId = value

        const user = await this.userService.user({
            id: userId
        })

        if (user === null)
            throw new NotFoundException("Usuário não encontrado!")

        return user;
    }
}