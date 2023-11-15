import { UserInfo } from '@app/modules/userInfo/entity/userInfo.entity';
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
import { User } from '@app/modules/user/entities/user.entity';
import { CreateUserDTO } from '@app/modules/user/dto/createUser.dto';
import { UpdateUserDTO } from '@app/modules/user/dto/updateUser.dto';
import { LoginUserDTO } from '@app/modules/user/dto/loginUser.dto';
import { FollowUserDTO } from '@app/modules/user/dto/followUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const userByEmail = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
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

  async loginUser(loginUserDTO: LoginUserDTO): Promise<User> {
    const userByEmail = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email: loginUserDTO.email },
      relations: { info: true },
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

  async updateUser(user: User, updateUserDTO: UpdateUserDTO): Promise<User> {
    try {
      await this.userRepository.update(user.id, updateUserDTO);
      return await this.findOneBy('id', user.id);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async getAllUsers(
    limit?: number,
    page?: number,
  ): Promise<UsersResponseInterface> {
    const customQuery = this.userRepository.createQueryBuilder('u');
    if (limit) customQuery.take(limit);
    if (page) customQuery.skip(page * limit);
    customQuery.leftJoinAndSelect('u.info', 'i');
    customQuery.leftJoinAndSelect('u.friends', 'f');
    customQuery.orderBy('u.email');
    const [users, count] = await customQuery.getManyAndCount();
    return { users, count };
  }

  async findOneBy(field: keyof User, value: string): Promise<User> {
    try {
      const customQuery = this.userRepository.createQueryBuilder('u');
      customQuery.where(`u.${field} = :value`, { value });
      customQuery.leftJoinAndSelect('u.info', 'i');
      customQuery.leftJoinAndSelect('u.friends', 'f');
      customQuery.leftJoinAndSelect('f.info', 'fi');
      return await customQuery.getOneOrFail();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async toggleFollowUser(user: User, friendId: string): Promise<User> {
    try {
      if (friendId === user.id) throw new Error("You can't follow yourself");
      const friend = await this.findOneBy('id', friendId);
      const isFollow = user.friends.some((f) => f.id === friendId);

      if (isFollow) {
        user.friends = user.friends.filter((f) => {
          return f.id !== friendId;
        });
      } else {
        user.friends = [...user.friends, friend];
      }
      const updatedUser = await this.userRepository.save(user);
      return updatedUser;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  buildUserResponse(user: User): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  generateJwt(user: User): string {
    return sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
  }
}
