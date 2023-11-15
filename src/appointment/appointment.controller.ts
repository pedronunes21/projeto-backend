import { Controller, Post, Body, Get, UseGuards, Req, Delete, Param } from "@nestjs/common";
import { CreateAppointmentDto, DeleteAppointmentDto, GetAppointmentByLessonDto, setAppointmentPresenceDto } from "./dto/appointment.dto";
import { AppointmentService } from "./appointment.service";
import { GetLessonByIdPipe } from "src/common/pipes/lesson.pipe";
import { GetUserByIdPipe } from "src/common/pipes/user.pipe";
import { Lesson, User } from "@prisma/client";
import { Roles } from "src/role/role.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/role/role.guard";
import { Role } from "src/role/role.enum";

@Controller("appointment")
export class AppointmentController {

    constructor(private appointmentService: AppointmentService) { }

    @Get("user/:id")
    @UseGuards(AuthGuard)
    async getAppointmentsByUser(
        @Param("id") id: string,
    ) {
        return this.appointmentService.appointments({
            where: {
                userId: id,
                // done: true,
            },
            include: {
                lesson: {
                    include: {
                        training: {
                            select: {
                                category: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    @Get()
    @UseGuards(AuthGuard)
    async getAppointments(@Req() req: {
        user: {
            id: string;
            email: string;
            role: number;
        }
    }) {
        return this.appointmentService.appointments({
            where: {
                userId: req.user.id,
                done: false,
            },
            include: {
                lesson: {
                    include: {
                        training: {
                            select: {
                                category: true
                            }
                        }
                    }
                }
            }
        })
    }

    @Get("history")
    @UseGuards(AuthGuard)
    async getAppointmentsHistory(@Req() req: {
        user: {
            id: string;
            email: string;
            role: number;
        }
    }) {
        return this.appointmentService.appointments({
            where: {
                userId: req.user.id,
            },
            include: {
                lesson: {
                    include: {
                        training: {
                            select: {
                                category: true
                            }
                        }
                    }
                }
            }
        })
    }

    @Get("lesson/:lessonId")
    @UseGuards(AuthGuard)
    async getAppointmentsByLesson(
        @Param("lessonId", GetLessonByIdPipe) _: Lesson,
        @Param() getAppointmentByLessonDto: GetAppointmentByLessonDto
    ) {
        const { lessonId } = getAppointmentByLessonDto
        return this.appointmentService.appointments({
            where: {
                lessonId,
                done: false,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        })
    }

    @Delete(":lessonId")
    @UseGuards(AuthGuard)
    async deleteAppointments(@Req() req: {
        user: {
            id: string;
            email: string;
            role: number;
        }
    },
        @Param("lessonId", GetLessonByIdPipe) lesson: Lesson,
    ) {
        return this.appointmentService.deleteAppointment({
            lesson: {
                connect: { id: lesson.id }
            },
            user: {
                connect: { id: req.user.id }
            }
        })
    }

    @Post()
    @UseGuards(AuthGuard)
    async createAppointment(
        @Req() req: {
            user: {
                id: string;
                email: string;
                role: number;
            }
        },
        @Body("lessonId", GetLessonByIdPipe) _: Lesson,
        @Body() createAppointmentDto: CreateAppointmentDto
    ) {
        const { lessonId } = createAppointmentDto
        return this.appointmentService.createAppointment({
            lesson: {
                connect: { id: lessonId },
            },
            user: {
                connect: { id: req.user.id }
            }
        })
    }

    @Post("presence")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async setAppointmentPresence(
        @Body() data: { [x: string]: boolean }
    ) {
        return this.appointmentService.setAppointmentPresence(data)
    }
}