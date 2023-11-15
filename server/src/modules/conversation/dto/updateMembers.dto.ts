import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateMembersDTO {
  @ApiProperty()
  @IsString()
  candidateId: string;
}
