import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { TrainingService } from "./training.service";
import { CreateTrainingDto } from "./dto/training.dto";
import { Training } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";

@Controller("training")
export class TrainingController {
    constructor(private readonly trainingService: TrainingService) { }

    @Get(":id")
    @UseGuards(AuthGuard)
    async getTraining(@Param("id") id: string): Promise<Training | null> {
        return this.trainingService.training({ id })
    }

    @Get()
    @UseGuards(AuthGuard)
    async getTrainings(): Promise<Training[]> {
        return this.trainingService.trainings({
            include: {
                category: true
            }
        })
    }

    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async createTraining(@Body() createTrainingDto: CreateTrainingDto): Promise<Training> {
        const { categoryId, description } = createTrainingDto;
        return this.trainingService.createTraining({
            description,
            category: {
                connect: { id: categoryId }
            }
        })
    }
}