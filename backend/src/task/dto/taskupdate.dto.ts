import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class TaskUpdateDTO {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  completed: boolean;

  @IsNumber()
  userId: number;
}
