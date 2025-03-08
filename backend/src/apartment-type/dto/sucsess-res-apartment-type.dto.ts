import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateApartmentTypeDto } from './create-apartment-type.dto';

export class SussesResApartmentTypeDto extends CreateApartmentTypeDto {
     @ApiProperty({
        description: 'The name of the apartment type',
        example: 1,
      })
    id: number
}
