import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  url: string;

  @IsString()
  @IsNotEmpty()
  singer: string;
}
