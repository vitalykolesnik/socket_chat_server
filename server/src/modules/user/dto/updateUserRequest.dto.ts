import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserDTO } from '@app/modules/user/dto/updateUser.dto';

export class UpdateUserRequestDTO {
  @ApiProperty()
  readonly user: UpdateUserDTO;
}
