import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.Service';
import { User, Prisma, Message, Task } from '@prisma/client';

type UserTasksMessages = Prisma.UserGetPayload<{
  include: {
    tasks: true;
    messages: true;
    projects: true;
  };
}>;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUser({
    id,
    username,
  }: {
    id?: number;
    username?: string;
  }): Promise<UserTasksMessages | null> {
    return this.prisma['user'].findUnique({
      where: { id, username },
      include: { tasks: true, messages: true, projects: true },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
