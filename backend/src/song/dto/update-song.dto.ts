import { IsOptional, IsString } from 'class-validator';
export class UpdateSongDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  singer: string;
}
