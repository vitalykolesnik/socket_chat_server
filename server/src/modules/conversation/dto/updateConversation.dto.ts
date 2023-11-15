import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateConversationDTO {
  @ApiProperty({
    example: 'Title',
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Icon',
  })
  @IsOptional()
  @IsString()
  icon: string;
}
