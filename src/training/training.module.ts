import { Module } from "@nestjs/common";
import { TrainingController } from "./training.controller";
import { TrainingService } from "./training.service";
import { TrainingCategoryModule } from "./category/training-category.module";

@Module({
    imports: [TrainingCategoryModule],
    controllers: [TrainingController],
    providers: [TrainingService]
})
export class TrainingModule { }