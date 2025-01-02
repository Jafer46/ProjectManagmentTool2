import { Body, Controller, Post } from '@nestjs/common';
import { TimeService } from './time.service';
import { GetCalendarDto } from './dtos/get-calendar.dto';

@Controller('calendar')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Post()
  async getCalendar(@Body() body: GetCalendarDto) {
    return this.timeService.getCalendar(body);
  }
}
