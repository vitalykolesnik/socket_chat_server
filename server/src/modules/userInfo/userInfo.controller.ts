import { User } from './../user/entities/user.entity';
import { UpdateUserInfoDTO } from '@app/modules/userInfo/dto/updateUserInfo.dto';
import { JWTGuard } from '@app/guards/jwt.guard';
import { UserInfo } from '@app/modules/userInfo/entity/userInfo.entity';
import { UserInfoService } from '@app/modules/userInfo/userInfo.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UsersInfoResponseInterface } from '@app/modules/userInfo/types/userInfo.type';
import { CurrentUser } from '@app/decorators/user.decorator';

@ApiTags('info')
@Controller('info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Get()
  async getInfo(): Promise<UsersInfoResponseInterface> {
    return await this.userInfoService.getAllInfo();
  }

  @Get('/:userId')
  async getInfoById(@Param('userId') userId: string): Promise<UserInfo> {
    return await this.userInfoService.getInfoByUserId(userId);
  }

  @Put()
  @ApiBearerAuth('access-token')
  @UseGuards(JWTGuard)
  @ApiBody({
    type: UpdateUserInfoDTO,
  })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateInfo(
    @CurrentUser() user: User,
    @Body() updateInfoDTO: UpdateUserInfoDTO,
  ) {
    return await this.userInfoService.updateInfo(user, updateInfoDTO);
  }
}
