import { IsNumber } from 'class-validator';

export class GetCalendarDto {
  @IsNumber()
  month: number;
  @IsNumber()
  year: number;
}
