import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.Service';
import { GetCalendarDto } from './dtos/get-calendar.dto';

@Injectable()
export class TimeService {
  constructor(private readonly prisma: PrismaService) {}
  getCalendar(dto: GetCalendarDto) {
    const { month, year } = dto;

    // Create the start and end dates for the month
    const startDate = new Date(year, month - 1, 1); // month is 0-indexed in JavaScript
    const endDate = new Date(year, month, 1); // Start of the next month

    return this.prisma.task.findMany({
      where: {
        createdAt: {
          gte: startDate, // Greater than or equal to startDate
          lt: endDate, // Less than start of the next month
        },
      },
      include: {
        project: {
          select: {
            title: true,
          },
        },
      },
    });
  }
}
