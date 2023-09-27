import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDTO } from '@app/modules/user/dto/loginUser.dto';

export class LoginUserRequestDTO {
  @ApiProperty()
  readonly user: LoginUserDTO;
}
