import { Controller, Get, Req } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Request } from 'express';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboard(@Req() req: Request) {
    const userId = Number(req.user);
    const dashboard = await this.dashboardService.getDashboard(userId);
    return dashboard;
  }
}
