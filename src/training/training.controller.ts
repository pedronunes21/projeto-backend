import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TrainingService } from "./training.service";
import { CreateTrainingDto, UpdateTrainingDto } from "./dto/training.dto";
import { Training } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { RolesGuard } from "src/role/role.guard";
import { GetTrainingByIdPipe } from "src/common/pipes/training.pipe";

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
        return this.trainingService.trainings({})
    }

    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async createTraining(
        @Body() createTrainingDto: CreateTrainingDto,
    ): Promise<Training> {

        const { category, description } = createTrainingDto;
        return this.trainingService.createTraining({
            description,
            category
        })
    }

    @HttpCode(HttpStatus.OK)
    @Delete(":id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async deleteTraining(@Param("id", GetTrainingByIdPipe) training: Training) {
        return this.trainingService.deleteTraining(training.id)
    }

    @Put(":id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async updateTraining(
        @Param("id", GetTrainingByIdPipe) training: Training,
        @Body() updateTrainingDto: UpdateTrainingDto
    ) {
        return this.trainingService.updateTraining(training.id, updateTrainingDto)
    }
}