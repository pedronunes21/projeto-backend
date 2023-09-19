import { Injectable, NotFoundException, BadRequestException, PipeTransform } from "@nestjs/common";
import { TrainingService } from "src/training/training.service";

@Injectable()
export class GetTrainingByIdPipe implements PipeTransform<string, any> {

    constructor(private trainingService: TrainingService) { }

    async transform(value: string) {

        if (!value)
            return null;

        value = String(value)
        const trainingId = value

        const training = await this.trainingService.training({
            id: trainingId
        })

        if (training === null)
            throw new NotFoundException("Treino não encontrado!")

        return training;
    }

}