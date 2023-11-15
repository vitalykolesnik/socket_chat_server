import { FollowUserDTO } from './dto/followUser.dto';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JWTGuard } from '@app/guards/jwt.guard';
import { CurrentUser } from '@app/decorators/user.decorator';
import { User } from '@app/modules/user/entities/user.entity';
import { UserService } from '@app/modules/user/user.service';
import { UserResponseInterface } from '@app/modules/user/types/user.type';
import { UsersResponseInterface } from '@app/modules/user/types/user.type';
import { CreateUserDTO } from '@app/modules/user/dto/createUser.dto';
import { LoginUserDTO } from '@app/modules/user/dto/loginUser.dto';
import { UpdateUserDTO } from '@app/modules/user/dto/updateUser.dto';
import { CreateUserRequestDTO } from '@app/modules/user/dto/createUserRequest.dto';
import { LoginUserRequestDTO } from '@app/modules/user/dto/loginUserRequest.dto';
import { UpdateUserRequestDTO } from '@app/modules/user/dto/updateUserRequest.dto';
import { UserInfoService } from '@app/modules/userInfo/userInfo.service';

@ApiTags('user')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userInfoService: UserInfoService,
  ) {}

  @Post('signup')
  @ApiBody({
    type: CreateUserRequestDTO,
  })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async createUser(
    @Body('user') createUserDTO: CreateUserDTO,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDTO);
    await this.userInfoService.createInfo(user);
    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  @ApiBody({
    type: LoginUserRequestDTO,
  })
  @UsePipes(new ValidationPipe())
  async loginUser(
    @Body('user') loginUserDto: LoginUserDTO,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(JWTGuard)
  @ApiBearerAuth('access-token')
  async currentUser(@CurrentUser() user: User): Promise<UserResponseInterface> {
    const me = await this.userService.findOneBy('id', user.id);
    return this.userService.buildUserResponse(me);
  }

  @Get('users')
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  async getAllUsers(
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(1)) page?: number,
  ): Promise<UsersResponseInterface> {
    return await this.userService.getAllUsers(limit, page - 1);
  }

  @Get('user/:id')
  async getById(@Param('id') id: string): Promise<User> {
    return await this.userService.findOneBy('id', id);
  }

  @Put('user')
  @ApiBody({
    type: UpdateUserRequestDTO,
  })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @UseGuards(JWTGuard)
  @ApiBearerAuth('access-token')
  async updateUser(
    @CurrentUser() user: User,
    @Body('user') updateUserDto: UpdateUserDTO,
  ): Promise<User> {
    return await this.userService.updateUser(user, updateUserDto);
  }

  @Put('user/follow')
  @ApiBody({
    type: FollowUserDTO,
  })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @UseGuards(JWTGuard)
  @ApiBearerAuth('access-token')
  async follow(
    @CurrentUser() user: User,
    @Body() followUserDTO: FollowUserDTO,
  ): Promise<User> {
    return await this.userService.toggleFollowUser(
      user,
      followUserDTO.friendId,
    );
  }
}
