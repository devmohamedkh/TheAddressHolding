import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { ApartmentType } from './entities/apartment-type.entity';
import { CreateApartmentTypeDto } from './dto/create-apartment-type.dto';
import { UpdateApartmentTypeDto } from './dto/update-apartment-type.dto';

@Injectable()
export class ApartmentTypeService {
  private readonly logger = new Logger(ApartmentTypeService.name);

  constructor(
    @InjectRepository(ApartmentType)
    private readonly apartmentTypeRepository: Repository<ApartmentType>,
  ) {}

  async create(createApartmentTypeDto: CreateApartmentTypeDto) {
    return this.apartmentTypeRepository.manager.transaction(
      async (entityManager: EntityManager) => {
      try {
        const apartmentType = entityManager.create(ApartmentType, createApartmentTypeDto);
        return await entityManager.save(apartmentType);
      } catch (error) {
        this.logger.error('Error creating apartment type', error.stack);
        throw new InternalServerErrorException('Could not create apartment type');
      }
    });
  }

  async findAll() {
    try {
      return await this.apartmentTypeRepository.find();
    } catch (error) {
      this.logger.error('Error fetching apartment types', error.stack);
      throw new InternalServerErrorException('Could not fetch apartment types');
    }
  }

  async findOne(id: number) {
    try {
      const apartmentType = await this.apartmentTypeRepository.findOne({ where: { id } });
      if (!apartmentType) throw new NotFoundException(`Apartment Type with ID ${id} not found`);
      return apartmentType;
    } catch (error) {
      this.logger.error(`Error fetching apartment type with ID ${id}`, error.stack);
      throw new InternalServerErrorException('Could not fetch apartment type');
    }
  }

  async update(id: number, updateApartmentTypeDto: UpdateApartmentTypeDto) {
    return this.apartmentTypeRepository.manager.transaction(async (entityManager: EntityManager) => {
      try {
        const apartmentType = await entityManager.findOne(ApartmentType, { where: { id } });
        if (!apartmentType) throw new NotFoundException(`Apartment Type with ID ${id} not found`);

        Object.assign(apartmentType, updateApartmentTypeDto);
        return await entityManager.save(apartmentType);
      } catch (error) {
        this.logger.error(`Error updating apartment type with ID ${id}`, error.stack);
        throw new InternalServerErrorException('Could not update apartment type');
      }
    });
  }

  async remove(id: number) {
    return this.apartmentTypeRepository.manager.transaction(async (entityManager: EntityManager) => {
      try {
        const apartmentType = await entityManager.findOne(ApartmentType, { where: { id } });
        if (!apartmentType) throw new NotFoundException(`Apartment Type with ID ${id} not found`);

        await entityManager.remove(apartmentType);
        return { message: 'Apartment Type deleted successfully' };
      } catch (error) {
        this.logger.error(`Error deleting apartment type with ID ${id}`, error.stack);
        throw new InternalServerErrorException('Could not delete apartment type');
      }
    });
  }
}
