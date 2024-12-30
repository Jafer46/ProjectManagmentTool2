import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.Service';
import { Project, Prisma, Message, Task } from '@prisma/client';

type ProjectTasksMessages = Prisma.ProjectGetPayload<{
  include: {
    tasks: true;
    messages: true;
    users: true;
  };
}>;

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async getProjects(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async getUserProjects(userId: number, take?: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        assignedProjects: {
          include: { users: true },
        },
      },
    });

    const projects = user.assignedProjects;

    // Map through projects to add the counts
    const projectsWithCounts = await Promise.all(
      projects.map(async (project) => {
        const totalTasks = await this.prisma.task.count({
          where: { projectId: project.id },
        });

        const completedTasks = await this.prisma.task.count({
          where: {
            projectId: project.id,
            completed: true,
          },
        });

        return {
          ...project,
          totalTasks,
          completedTasks,
        };
      }),
    );
  }

  async getProject(id: number): Promise<ProjectTasksMessages | null> {
    return this.prisma.project.findUnique({
      where: { id },
      include: { tasks: true, messages: true, users: true },
    });
  }

  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({ data });
  }

  async updateProject(
    id: number,
    data: Prisma.ProjectUpdateInput,
  ): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Project> {
    return this.prisma.project.delete({
      where: { id },
    });
  }

  async addUsersToProject(userIdList: number[], projectId: number) {
    this.prisma.project.update({
      where: { id: projectId },
      data: {
        users: {
          connect: userIdList.map((userId) => ({ id: userId })),
        },
      },
    });
  }

  async isAdmin(userId: number, projectId): Promise<Boolean> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    return userId == project?.creatorId;
  }
}
