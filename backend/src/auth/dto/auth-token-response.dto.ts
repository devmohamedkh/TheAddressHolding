import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', description: 'Access Token' })
  accessToken: string;
}
