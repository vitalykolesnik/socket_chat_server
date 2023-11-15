import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FollowUserDTO {
  @ApiPropertyOptional()
  @IsString()
  readonly friendId: string;
}
