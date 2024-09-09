import { IsString, IsInt, Min } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  username: string;

  @IsInt()
  @Min(1)
  streams_limit: number;
}
