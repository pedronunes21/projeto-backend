import { IsEmail, IsISO8601, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString({
        message: "Você deve informar um nome"
    })
    name: string;
    @IsISO8601({}, {
        message: "Você deve informar uma data válida!"
    })
    birthDate: string;
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


export class UpdateUserDto {
    @IsString({
        message: "Você deve informar um nome"
    })
    name: string;
    @IsISO8601({}, {
        message: "Você deve informar uma data válida!"
    })
    birthDate: string;
    @IsEmail({}, {
        message: "O email deve ser válido"
    })
    email: string;

    @IsOptional()
    password: string;
}

export class DeleteUserDto {
    @IsString({
        message: "Você deve informar um ID"
    })
    id: string;
}