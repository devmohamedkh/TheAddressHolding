import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ApartmentTypeService } from './apartment-type.service';
import { CreateApartmentTypeDto } from './dto/create-apartment-type.dto';
import { UpdateApartmentTypeDto } from './dto/update-apartment-type.dto';
import { ApartmentType } from './entities/apartment-type.entity';

@ApiTags('Apartment Types')
@Controller('apartment-types')
export class ApartmentTypeController {
  constructor(private readonly apartmentTypeService: ApartmentTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new apartment type' })
  @ApiResponse({ status: 201, description: 'Apartment type created successfully', type: ApartmentType })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  create(@Body() createApartmentTypeDto: CreateApartmentTypeDto) {
    return this.apartmentTypeService.create(createApartmentTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all apartment types' })
  @ApiResponse({ status: 200, description: 'List of apartment types', type: [ApartmentType] })
  findAll() {
    return this.apartmentTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single apartment type by ID' })
  @ApiParam({ name: 'id', description: 'Apartment Type ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Apartment type found', type: ApartmentType })
  @ApiResponse({ status: 404, description: 'Apartment type not found' })
  findOne(@Param('id') id: string) {
    return this.apartmentTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing apartment type' })
  @ApiParam({ name: 'id', description: 'Apartment Type ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Apartment type updated', type: ApartmentType })
  @ApiResponse({ status: 404, description: 'Apartment type not found' })
  update(@Param('id') id: string, @Body() updateApartmentTypeDto: UpdateApartmentTypeDto) {
    return this.apartmentTypeService.update(+id, updateApartmentTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an apartment type' })
  @ApiParam({ name: 'id', description: 'Apartment Type ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Apartment type deleted' })
  @ApiResponse({ status: 404, description: 'Apartment type not found' })
  remove(@Param('id') id: string) {
    return this.apartmentTypeService.remove(+id);
  }
}
