import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApartmentTypeService } from './apartment-type.service';
import { CreateApartmentTypeDto } from './dto/create-apartment-type.dto';
import { UpdateApartmentTypeDto } from './dto/update-apartment-type.dto';
import { ApiCreateApartmentType, ApiDeleteApartmentTypeById,ApiGetAllApartmentTypes,ApiGetApartmentTypeById,ApiUpdateApartmentTypeById} from './swaggerHelper'
import { JwtAuthGuard } from 'src/common/guards';
@ApiTags('Apartment Types')
@Controller('apartment-types')
export class ApartmentTypeController {
  constructor(private readonly apartmentTypeService: ApartmentTypeService) {}

  @Post()
  @ApiCreateApartmentType()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @ApiUpdateApartmentTypeById()
  update(@Param('id') id: string, @Body() updateApartmentTypeDto: UpdateApartmentTypeDto) {
    return this.apartmentTypeService.update(+id, updateApartmentTypeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiDeleteApartmentTypeById()
  remove(@Param('id') id: string) {
    return this.apartmentTypeService.remove(+id);
  }
}
