import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrainingModule } from './training/training.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma.module';
import { RoleModule } from './role/role.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './schedule/schedule.service';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [
    UserModule,
    TrainingModule,
    AuthModule,
    PrismaModule,
    RoleModule,
    LessonModule,
    ScheduleModule.forRoot(),
  ],
  providers: [ScheduleService]
})
export class AppModule { }
