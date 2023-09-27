import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiPropertyOptional({ example: 'jerry@gmail.com' })
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly socketId: string;

  // @ApiPropertyOptional()
  // @IsString()
  // @IsOptional()
  // readonly username: string;

  // @ApiPropertyOptional()
  // @IsString()
  // @IsOptional()
  // readonly bio: string;

  // @ApiPropertyOptional()
  // @IsString()
  // @IsOptional()
  // readonly image: string;
}
