import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
    @IsNotEmpty({
        message: "Campo email não pode ser vazio"
    })
    @IsEmail({}, {
        message: "Você deve informar um email válido"
    })
    email: string;
    @IsNotEmpty({
        message: "Campo senha não pode ser vazio"
    })
    password: string;
}