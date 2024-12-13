import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.Service";
import { Task, Prisma } from "@prisma/client";



@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) {}

    async getTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }

    async getTask(id: number): Promise<Task | null> {
        return this.prisma['task'].findUnique({
            where:{id}
        });
    }

    async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
        return this.prisma.task.create({ data });
    }

    async updateTask(id: number, data: Prisma.TaskUpdateInput): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<Task> {
        return this.prisma.task.delete({
            where: { id },
        });
    }
}