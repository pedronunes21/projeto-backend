import { Injectable } from "@nestjs/common";
import { Prisma, TrainingCategory } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class TrainingCategoryService {
    constructor(private prisma: PrismaService) { }

    async trainingCategory(
        trainingCategoryWhereUniqueInput: Prisma.TrainingCategoryWhereUniqueInput
    ): Promise<TrainingCategory | null> {
        return this.prisma.trainingCategory.findUnique({
            where: trainingCategoryWhereUniqueInput
        })
    }

    async trainingCategories(
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.TrainingCategoryWhereUniqueInput;
            where?: Prisma.TrainingCategoryWhereInput;
            orderBy?: Prisma.TrainingCategoryOrderByWithRelationInput;
            select?: Prisma.TrainingCategorySelect,
            include?: Prisma.TrainingCategoryInclude
        }): Promise<TrainingCategory[]> {
        return this.prisma.trainingCategory.findMany({ ...params })
    }

    async createTrainingCategory(data: Prisma.TrainingCategoryCreateInput): Promise<TrainingCategory> {
        return this.prisma.trainingCategory.create({ data })
    }
}