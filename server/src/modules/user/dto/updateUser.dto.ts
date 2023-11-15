import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiPropertyOptional({ example: 'jerry@gmail.com' })
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly socketId: string;
}
