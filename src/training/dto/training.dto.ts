import { IsNotEmpty, IsOptional, } from "class-validator";

export class CreateTrainingDto {
    @IsNotEmpty({
        message: "Você deve informar uma categoria"
    })
    category: string;
    @IsNotEmpty({
        message: "Você deve informar uma descrição"
    })
    description: string;
}

export class UpdateTrainingDto {
    @IsOptional()
    category: string;
    @IsOptional()
    description: string;
}