import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class ScheduleService {
    constructor() { }
    private readonly logger = new Logger(ScheduleService.name)

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // handleCron() {
    //     this.logger.debug("Calling cron")
    // }
}