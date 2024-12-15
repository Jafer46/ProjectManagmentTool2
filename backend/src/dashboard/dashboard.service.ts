import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.Service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { projects: true, tasks: true },
    });
  }
}
