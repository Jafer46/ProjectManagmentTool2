import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  title: string;
  @IsString()
  description: string;
  userList: string[];
  @IsDate()
  deadline: Date;
  @IsString()
  priority: string;
  @IsString()
  type: string;
  @IsNumber()
  creatorId: number;
}
