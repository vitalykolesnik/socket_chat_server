import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { UserResponseInterface } from '@app/modules/user/types/user.type';
import { UsersResponseInterface } from '@app/modules/user/types/user.type';
import { UserEntity } from '@app/modules/user/entity/user.entity';
import { CreateUserDTO } from '@app/modules/user/dto/createUser.dto';
import { UpdateUserDTO } from '@app/modules/user/dto/updateUser.dto';
import { LoginUserDTO } from '@app/modules/user/dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDTO.email },
    });
    if (userByEmail) {
      throw new UnprocessableEntityException('Email is are taken');
    }
    const newUser = this.userRepository.create(createUserDTO);
    await this.userRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }

  async loginUser(loginUserDTO: LoginUserDTO): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: loginUserDTO.email },
      select: ['id', 'email', 'password'],
      // select: ['id', 'username', 'bio', 'image', 'email', 'password'],
    });
    if (!userByEmail) {
      throw new UnprocessableEntityException('Email or password are not valid');
    }
    const isPasswordCorrect = await compare(
      loginUserDTO.password,
      userByEmail.password,
    );
    if (!isPasswordCorrect) {
      throw new UnprocessableEntityException('Email or password are not valid');
    }
    delete userByEmail.password;
    return userByEmail;
  }

  async updateUser(
    id: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<UserEntity> {
    try {
      const userById = await this.findById(id);
      Object.assign(userById, updateUserDTO);
      return await this.userRepository.save(userById);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async getAllUsers(
    limit?: number,
    page?: number,
  ): Promise<UsersResponseInterface> {
    const customQuery = this.userRepository.createQueryBuilder('user');
    // if (userName) customQuery.where(`user.userName LIKE '%${userName}%'`);
    if (limit) customQuery.take(limit);
    if (page) customQuery.skip(page * limit);
    customQuery.orderBy('user.id');
    const [users, count] = await customQuery.getManyAndCount();
    return { users, count };
  }

  findById(id: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  findBySocketId(socketId: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { socketId },
    });
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
  }
}
