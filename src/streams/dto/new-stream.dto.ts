import { IsString, IsDate } from 'class-validator';

export class NewStreamDto {
  @IsString()
  userId: string;

  @IsDate()
  startTime: Date;
}
