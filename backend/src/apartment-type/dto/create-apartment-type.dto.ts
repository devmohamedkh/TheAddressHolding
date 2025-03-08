import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateApartmentTypeDto {
  @ApiProperty({
    description: 'The name of the apartment type',
    example: 'Luxury Apartment',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
