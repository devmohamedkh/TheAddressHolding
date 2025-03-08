import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto, UpdateApartmentDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreateApartment,ApiDeleteApartmentById,ApiGetAllApartments,ApiGetApartmentById,ApiUpdateApartmentById } from './swaggerHelper'
import { JwtAuthGuard } from 'src/common/guards';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/common/decorators';

  @Controller('apartments')
  export class ApartmentController {
    constructor(private readonly apartmentService: ApartmentService) {}

    @Post()
    @ApiCreateApartment()
    @UseGuards(JwtAuthGuard)
    create(
      @CurrentUser() user: User,
      @Body() createApartmentDto: CreateApartmentDto
    ) {
      return this.apartmentService.create(user, createApartmentDto);
    }

    @Get()
    @ApiGetAllApartments()
     findAll() {
      return this.apartmentService.findAll();
    }

    @Get(':id')
   @ApiGetApartmentById()
    findOne(@Param('id') id: number) {
      return this.apartmentService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiUpdateApartmentById()
    update(@Param('id') id: number, @Body() updateApartmentDto: UpdateApartmentDto) {
      return this.apartmentService.update(id, updateApartmentDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiDeleteApartmentById()
    remove(@Param('id') id: number) {
      return this.apartmentService.remove(id);
    }
  }
