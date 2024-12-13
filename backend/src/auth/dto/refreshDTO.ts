import { IsString } from 'class-validator';

export class RefreshDTO {
  @IsString()
  refreshToken: string;
}
