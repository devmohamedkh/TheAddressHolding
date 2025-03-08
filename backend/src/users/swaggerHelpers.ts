import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserResponseDto } from './dto';

export function ApiCreateUserOperation() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new user' }),
    ApiResponse({ status: 201, description: 'User created successfully' }),
    ApiResponse({ status: 400, description: 'Bad request' }),
    ApiResponse({ status: 401, description: 'Unauthorized' })
  );
}

export function ApiGetUsersOperation() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all users' }),
    ApiOkResponse({
      description: 'List of users',
      type: UserResponseDto,
      isArray: true
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' })
  );
}

export function ApiGetUserByIdOperation() {
  return applyDecorators(
    ApiOperation({ summary: 'Get user by ID' }),
    ApiOkResponse({ description: 'User details', type: UserResponseDto }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'User not found' })
  );
}
