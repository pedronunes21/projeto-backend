import { TrainingCategory } from "@prisma/client";
import { TrainingCategoryService } from "./training-category.service";
import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { CreateTrainingCategoryDto } from "./dto/training-category.dto";

@Controller("category/training")
export class TrainingCategoryController {
    constructor(private readonly trainingCategoryService: TrainingCategoryService) { }

    @Get(":id")
    async getTrainingCategory(@Param("id") id: string): Promise<TrainingCategory | null> {
        return this.trainingCategoryService.trainingCategory({ id })
    }

    @Get()
    async getTrainingCategories(): Promise<TrainingCategory[]> {
        return this.trainingCategoryService.trainingCategories({})
    }

    @Post()
    async createTrainingCategory(@Body() createTrainingCategoryDto: CreateTrainingCategoryDto): Promise<TrainingCategory> {
        return this.trainingCategoryService.createTrainingCategory(createTrainingCategoryDto)
    }

}