import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApartmentTypeService } from './apartment-type.service';
import { CreateApartmentTypeDto } from './dto/create-apartment-type.dto';
import { UpdateApartmentTypeDto } from './dto/update-apartment-type.dto';
import { ApiCreateApartmentType, ApiDeleteApartmentTypeById,ApiGetAllApartmentTypes,ApiGetApartmentTypeById,ApiUpdateApartmentTypeById} from './swaggerHelper'
@ApiTags('Apartment Types')
@Controller('apartment-types')
export class ApartmentTypeController {
  constructor(private readonly apartmentTypeService: ApartmentTypeService) {}

  @Post()
  @ApiCreateApartmentType()
  create(@Body() createApartmentTypeDto: CreateApartmentTypeDto) {
    return this.apartmentTypeService.create(createApartmentTypeDto);
  }

  @Get()
  @ApiGetAllApartmentTypes()
  findAll() {
    return this.apartmentTypeService.findAll();
  }

  @Get(':id')
  @ApiGetApartmentTypeById()
  findOne(@Param('id') id: string) {
    return this.apartmentTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiUpdateApartmentTypeById()
  update(@Param('id') id: string, @Body() updateApartmentTypeDto: UpdateApartmentTypeDto) {
    return this.apartmentTypeService.update(+id, updateApartmentTypeDto);
  }

  @Delete(':id')
  @ApiDeleteApartmentTypeById()
  remove(@Param('id') id: string) {
    return this.apartmentTypeService.remove(+id);
  }
}
