import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDTO } from '@app/modules/user/dto/createUser.dto';

export class CreateUserRequestDTO {
  @ApiProperty()
  readonly user: CreateUserDTO;
}
