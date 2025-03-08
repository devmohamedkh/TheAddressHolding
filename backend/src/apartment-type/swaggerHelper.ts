import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateApartmentTypeDto } from './dto/create-apartment-type.dto';
import { UpdateApartmentTypeDto } from './dto/update-apartment-type.dto';
import { ApartmentType } from './entities/apartment-type.entity';
import { SussesResApartmentTypeDto } from './dto/sucsess-res-apartment-type.dto';

export function ApiCreateApartmentType() {
    return applyDecorators(
        ApiOperation({ summary: 'Create a new apartment type' }),
        ApiResponse({ status: 201, description: 'The apartment type has been successfully created.', type: SussesResApartmentTypeDto }),
        ApiResponse({ status: 400, description: 'Validation failed.' }),
    );
}

export function ApiGetAllApartmentTypes() {
    return applyDecorators(
        ApiOperation({ summary: 'Get all apartment types' }),
        ApiResponse({ status: 200, description: 'List of all apartment types.', type: SussesResApartmentTypeDto, isArray: true }),
    );
}

export function ApiGetApartmentTypeById() {
    return applyDecorators(
        ApiOperation({ summary: 'Get an apartment type by ID' }),
        ApiParam({ name: 'id', description: 'Apartment Type ID', example: 1 }),
        ApiResponse({ status: 200, description: 'Return the apartment type with the given ID.', type: SussesResApartmentTypeDto }),
        ApiResponse({ status: 404, description: 'Apartment type not found.' }),
    );
}

export function ApiUpdateApartmentTypeById() {
    return applyDecorators(
        ApiOperation({ summary: 'Update an apartment type by ID' }),
        ApiParam({ name: 'id', description: 'Apartment Type ID', example: 1 }),
        ApiResponse({ status: 200, description: 'The apartment type has been successfully updated.', type: SussesResApartmentTypeDto }),
        ApiResponse({ status: 404, description: 'Apartment type not found.' }),
    );
}

export function ApiDeleteApartmentTypeById() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete an apartment type by ID' }),
        ApiParam({ name: 'id', description: 'Apartment Type ID', example: 1 }),
        ApiResponse({ status: 200, description: 'The apartment type has been successfully deleted.' }),
        ApiResponse({ status: 404, description: 'Apartment type not found.' }),
    );
}
