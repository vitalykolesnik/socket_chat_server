import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '@app/modules/user/entity/user.entity';

export class CreateMessageDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty()
  @IsNotEmpty()
  to: UserEntity;

  @ApiProperty()
  @IsNotEmpty()
  readonly text: string;

  @ApiProperty()
  @IsNotEmpty()
  from: UserEntity;
}
