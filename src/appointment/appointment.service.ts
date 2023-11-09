import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { Appointment, Prisma } from "@prisma/client";

@Injectable()
export class AppointmentService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async appointment(
        appointmentWhereInput: Prisma.AppointmentWhereInput
    ): Promise<Appointment | null> {
        return this.prisma.appointment.findFirst({
            where: appointmentWhereInput,
            include: {
                lesson: true,
                user: true
            }
        })
    }

    async appointments(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.AppointmentWhereUniqueInput;
        where?: Prisma.AppointmentWhereInput;
        orderBy?: Prisma.AppointmentOrderByWithRelationInput;
        select?: Prisma.AppointmentSelect,
        include?: Prisma.AppointmentInclude
    }): Promise<Appointment[]> {
        return this.prisma.appointment.findMany({
            ...params
        })
    }

    async createAppointment(data: Prisma.AppointmentCreateInput) {

        const appointmentAlreadyExists = await this.appointment({
            lessonId: data.lesson.connect.id,
            userId: data.user.connect.id,
            done: false,
        })

        if (!appointmentAlreadyExists) {
            const lessonAppointments = await this.appointments({
                where: { lessonId: data.lesson.connect.id, done: false }
            })
            const lesson = await this.prisma.lesson.findUnique({
                where: { id: data.lesson.connect.id }
            })

            if (lessonAppointments.length >= lesson.max_users) {
                throw new BadRequestException("Essa aula já está cheia!")
            } else {
                return this.prisma.appointment.create({
                    data
                })
            }
        } else {
            throw new BadRequestException("Você já está agendado nessa aula!")
        }

    }

    async deleteAppointment(data: Prisma.AppointmentCreateInput) {

        const appointmentExists = await this.appointment({
            lessonId: data.lesson.connect.id,
            userId: data.user.connect.id,
        })

        if (appointmentExists) {
            return this.prisma.appointment.delete({
                where: { id: appointmentExists.id }
            })
        } else {
            throw new BadRequestException("Esse agendamento não existe!")
        }

    }

    async setAppointmentPresence(data: { [x: string]: boolean }) {
        Object.keys(data).map(async (id) => {
            await this.prisma.appointment.update({
                where: {
                    id
                },
                data: {
                    presence: data[id]
                }
            })
        })

        return true;
    }
}