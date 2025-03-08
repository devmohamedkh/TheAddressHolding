import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOneOptions, FindOptionsSelect, FindOptionsSelectByString } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserRequest, UserResponseDto } from './dto';
import { GetAllUsersQueries } from './types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserRequest): Promise<User> {

    
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (existingUser) {
         throw new BadRequestException('Email already in use');
      }

      const user = this.userRepository.create(data);
      return await this.userRepository.save(user);
    } catch (error) {
      
      if (error.code === '23505') {
        throw new BadRequestException('Email already in use');
      }
      
      throw new InternalServerErrorException(error?.message || 'An error occurred while creating the user');
    }
  }

  async getUser( query: FindOneOptions<User> ): Promise<User> {
    const user = await this.userRepository.findOne(query);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUsers({ page, limit, sort, order, search }: GetAllUsersQueries): Promise<User[]> {

    const skip = (page - 1) * limit;
    const orderDirection = order === 'ASC' ? 'ASC' : 'DESC';

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (search) {
      queryBuilder.where(
        'user.name LIKE :search OR user.email LIKE :search',
        { search: `%${search}%` },
      );
    }

    const users = await queryBuilder
      .orderBy(`user.${sort}`, orderDirection)
      .skip(skip)
      .take(limit)
      .getMany();

      

    return users;
  }

  async updateUser(query:  FindOneOptions<User>, data: Partial<User>): Promise<User> {
    const user = await this.getUser(query);
    Object.assign(user, data);
    return this.userRepository.save(user);
  }
}
