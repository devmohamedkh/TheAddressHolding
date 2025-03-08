import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateApartmentDto, UpdateApartmentDto } from './dto';

export function ApiCreateApartment() {
    return applyDecorators(
        ApiOperation({ summary: 'Create apartment' }),
        ApiResponse({ status: 201, description: 'The apartment has been successfully created.' }),
        ApiResponse({ status: 403, description: 'Forbidden.' }),
    );
}

export function ApiGetAllApartments() {
    return applyDecorators(
        ApiOperation({ summary: 'Get all apartments' }),
        ApiResponse({ status: 200, description: 'Return all apartments.', type: CreateApartmentDto, isArray: true }),
    );
}

export function ApiGetApartmentById() {
    return applyDecorators(
        ApiOperation({ summary: 'Get apartment by id' }),
        ApiResponse({ status: 200, description: 'Return the apartment with the given id.', type: CreateApartmentDto }),
        ApiResponse({ status: 404, description: 'Apartment not found.' }),
    );
}

export function ApiUpdateApartmentById() {
    return applyDecorators(
        ApiOperation({ summary: 'Update apartment by id' }),
        ApiResponse({ status: 200, description: 'The apartment has been successfully updated.', type: UpdateApartmentDto }),
        ApiResponse({ status: 404, description: 'Apartment not found.' }),
    );
}

export function ApiDeleteApartmentById() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete apartment by id' }),
        ApiResponse({ status: 200, description: 'The apartment has been successfully deleted.' }),
        ApiResponse({ status: 404, description: 'Apartment not found.' }),
    );
}
