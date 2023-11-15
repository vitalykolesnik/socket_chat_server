import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateConversationDTO {
  @ApiProperty({
    example: 'Title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Icon',
  })
  @IsOptional()
  @IsString()
  icon: string;
}
