import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class ScheduleService {
    constructor(
        private prisma: PrismaService
    ) { }
    private readonly logger = new Logger(ScheduleService.name)

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCron() {
        const date = new Date()
        await this.prisma.appointment.updateMany({
            where: {
                lesson: {
                    weekday: date.getDay()
                }
            },
            data: {
                done: true,
            }
        })
    }
}