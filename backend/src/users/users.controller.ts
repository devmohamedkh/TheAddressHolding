import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  Query, 
  UseGuards 
} from '@nestjs/common';
<<<<<<< HEAD
import { CreateUserRequest } from './dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards';
import { User } from './entities/user.entity';
=======
import {  ApiOperation, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserRequest, UserResponseDto } from './dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards';
import { User } from './schema/user.entity';
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
import { ApiCreateUserOperation, ApiGetUserByIdOperation, ApiGetUsersOperation } from './swaggerHelpers';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreateUserOperation()
  async createUser(@Body() request: CreateUserRequest): Promise<void> {
    await this.usersService.create(request);
  }

  @Get()
<<<<<<< HEAD
  @UseGuards(JwtAuthGuard)
=======
  // @UseGuards(JwtAuthGuard)
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
  @ApiGetUsersOperation()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'createdAt',
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
    @Query('search') search: string = ''
  ): Promise<User[]> {
    return this.usersService.getUsers({ page, limit, sort, order, search });
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiGetUserByIdOperation()
  async getUserById(@Param('id') id: string): Promise<User> {
<<<<<<< HEAD
    return this.usersService.getUser({ where: { id }});
=======
    return this.usersService.getUser({id :id });
>>>>>>> 184e96aebf1c85e17b2b5a8b77085321d037510a
  }
}
