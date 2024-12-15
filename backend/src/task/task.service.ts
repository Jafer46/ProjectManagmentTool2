import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.Service';
import { Task, Prisma } from '@prisma/client';

type TasksProject = Prisma.TaskGetPayload<{
  include: {
    project: true;
  };
}>;

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async getTasks({
    where,
  }: {
    where: Prisma.TaskWhereInput;
  }): Promise<TasksProject[]> {
    return this.prisma.task.findMany({ where, include: { project: true } });
  }

  async getTask(id: number): Promise<TasksProject | null> {
    return this.prisma['task'].findUnique({
      where: { id },
      include: { project: true },
    });
  }

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async updateTask({
    id,
    data,
  }: {
    id: number;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete({ taskId }: { taskId: number }): Promise<Task> {
    return this.prisma.task.delete({
      where: { id: taskId },
    });
  }

  async isAdmin({
    userId,
    taskId,
  }: {
    userId: number;
    taskId: number;
  }): Promise<boolean> {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { project: true },
    });
    const project = task?.project;
    return userId == project?.creatorId;
  }
}
