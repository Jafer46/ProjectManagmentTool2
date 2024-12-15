import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsNumber()
  id: number;
  @IsString()
  avatar: string;
}
