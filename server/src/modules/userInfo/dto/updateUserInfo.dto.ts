import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserInfoDTO {
  @ApiPropertyOptional({ example: 'tom' })
  @IsString()
  @IsOptional()
  readonly username: string;

  @ApiPropertyOptional({ example: 'image' })
  @IsString()
  @IsOptional()
  readonly avatar: string;

  @ApiPropertyOptional({ example: 'Cat' })
  @IsString()
  @IsOptional()
  readonly about: string;
}
