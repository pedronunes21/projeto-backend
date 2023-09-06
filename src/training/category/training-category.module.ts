import { Module } from "@nestjs/common";
import { TrainingCategoryController } from "./training-category.controller";
import { TrainingCategoryService } from "./training-category.service";

@Module({
    controllers: [TrainingCategoryController],
    providers: [TrainingCategoryService]
})
export class TrainingCategoryModule { }