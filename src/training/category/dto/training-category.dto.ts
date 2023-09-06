import { IsNotEmpty, } from "class-validator";

export class CreateTrainingCategoryDto {
    @IsNotEmpty({
        message: "Você deve informar um nome para a categoria"
    })
    name: string;
}