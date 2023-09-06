import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, {
        message: "O email deve ser válido"
    })
    email: string;

    @IsNotEmpty({
        message: "Você deve informar uma senha"
    })
    password: string;
}

export class FindOneUserDto {
    @IsNotEmpty({
        message: "Você deve informar um ID"
    })
    id: string;
}