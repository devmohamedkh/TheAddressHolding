import { CreateApartmentDto } from './create-apartment.dto';
import {  PartialType } from '@nestjs/swagger';

export class UpdateApartmentDto extends PartialType(CreateApartmentDto) {}
