import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthTokenResponseDto } from './dto';
import { LoginDto } from './dto';

export function ApiLoginOperation() {
return applyDecorators(
    ApiOperation({
        summary: 'User login',
        description: 'Logs in a user and returns access & refresh tokens.',
    }),
    ApiResponse({ status: 201, description: 'User successfully logged in', type: AuthTokenResponseDto }),
    ApiResponse({ status: 400, description: 'Invalid credentials' }),
    ApiBody({ type: LoginDto }),
);
}

export function ApiRefreshTokenOperation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Refresh access token',
      description: 'Refreshes the access token using a refresh token.',
    }),
    ApiResponse({ status: 201, description: 'Refreshed access token successfully', type: AuthTokenResponseDto }),
    ApiResponse({ status: 401, description: 'Invalid refresh token' }),
  );
}

export function ApiLogoutOperation() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'User logout',
      description: 'Logs out a user and clears the refresh token.',
    }),
    ApiResponse({ status: 200, description: 'User successfully logged out' }),
  );
}
