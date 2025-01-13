import { IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  creatorId: string;
  @IsString()
  projectId: string;
  assignedUsersId: string[];
}
