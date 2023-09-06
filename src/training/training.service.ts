import { Body, Injectable } from "@nestjs/common";
import { Prisma, Training } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class TrainingService {
    constructor(private prisma: PrismaService) { }

    async training(
        trainingWhereUniqueInput: Prisma.TrainingWhereUniqueInput
    ): Promise<Training | null> {
        return this.prisma.training.findUnique({
            where: trainingWhereUniqueInput
        })
    }

    async trainings(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TrainingWhereUniqueInput;
        where?: Prisma.TrainingWhereInput;
        orderBy?: Prisma.TrainingOrderByWithRelationInput;
        select?: Prisma.TrainingSelect,
        include?: Prisma.TrainingInclude
    }): Promise<Training[]> {
        return this.prisma.training.findMany({ ...params })
    }

    async createTraining(data: Prisma.TrainingCreateInput): Promise<Training> {

        return this.prisma.training.create({
            data
        })
    }
}