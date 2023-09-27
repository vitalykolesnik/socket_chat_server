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
import { UserEntity } from '@app/modules/user/entity/user.entity';
import { UserService } from '@app/modules/user/user.service';
import { UserResponseInterface } from '@app/modules/user/types/user.type';
import { UsersResponseInterface } from '@app/modules/user/types/user.type';
import { CreateUserDTO } from '@app/modules/user/dto/createUser.dto';
import { LoginUserDTO } from '@app/modules/user/dto/loginUser.dto';
import { UpdateUserDTO } from '@app/modules/user/dto/updateUser.dto';
import { User } from '@app/decorators/user.decorator';
import { JWTGuard } from '@app/guards/jwt.guard';

import { CreateUserRequestDTO } from '@app/modules/user/dto/createUserRequest.dto';
import { LoginUserRequestDTO } from '@app/modules/user/dto/loginUserRequest.dto';
import { UpdateUserRequestDTO } from '@app/modules/user/dto/updateUserRequest.dto';

@ApiTags('user')
// @UsePipes(
//   new ValidationPipe({
//     whitelist: true,
//     forbidNonWhitelisted: true,
//   }),
// )
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    return this.userService.buildUserResponse(user);
  }

  @Post('signin')
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
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Get('users')
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  async getAllUsers(
    // @Query('name') userName?: string,
    @Query('limit', new DefaultValuePipe(10)) limit?: number,
    @Query('page', new DefaultValuePipe(1)) page?: number,
  ): Promise<UsersResponseInterface> {
    return await this.userService.getAllUsers(limit, page - 1);
  }

  @Get('user/:id')
  async getOneUser(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.findById(id);
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
    @User('id') id: string,
    @Body('user') updateUserDto: UpdateUserDTO,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(id, updateUserDto);
    return this.userService.buildUserResponse(user);
  }
}
