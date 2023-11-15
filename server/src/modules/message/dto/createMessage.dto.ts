import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '@app/modules/user/entities/user.entity';

export class CreateMessageDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly text: string;

  @ApiProperty()
  @IsOptional()
  from: User;

  @ApiProperty()
  @IsOptional()
  to: string;
}
