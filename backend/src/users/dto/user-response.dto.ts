import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '65f1a8b9c7e5b32f0d1e5678', description: 'User ID' })
  _id: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  name: string;

  @ApiProperty({ example: '2024-03-01T12:00:00.000Z', description: 'User creation date' })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-01T12:30:00.000Z', description: 'Last update date' })
  updatedAt: Date;
}
