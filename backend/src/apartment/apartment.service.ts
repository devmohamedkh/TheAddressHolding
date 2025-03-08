import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment } from './entities/apartment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ApartmentType } from '../apartment-type/entities/apartment-type.entity';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartmentRepository: Repository<Apartment>,

    @InjectRepository(ApartmentType)
    private readonly apartmentTypeRepository: Repository<ApartmentType>,
  ) { }

  async create(user: User, createApartmentDto: CreateApartmentDto) {
    const { type, ...apartmentData } = createApartmentDto;

    const apartmentType = await this.apartmentTypeRepository.findOneBy({
      id: type,
    });
    if (!apartmentType) throw new NotFoundException('Apartment type not found');

    const newApartment = this.apartmentRepository.create({
      ...apartmentData,
      createdBy: user,
      type: apartmentType,
    });

    return await this.apartmentRepository.save(newApartment);
  }

  async findAll() {
    return this.apartmentRepository.find({
      relations: ['createdBy', 'type'],
    });
  }

  async findOne(id: number) {
    const apartment = await this.apartmentRepository.findOne({
      where: { id },
      relations: ['createdBy', 'type'],
    });
    if (!apartment) throw new NotFoundException('Apartment not found');
    return apartment;
  }

  async update(id: number, updateApartmentDto: UpdateApartmentDto) {
    const apartment = await this.apartmentRepository.findOne({ where: { id } });
    if (!apartment) throw new NotFoundException('Apartment not found');

    let apartmentType;

    if (updateApartmentDto.type) {
      apartmentType = await this.apartmentTypeRepository.findOneBy({
        id: updateApartmentDto.type,
      });

      if (!apartmentType)
        throw new NotFoundException('Apartment type not found');

      updateApartmentDto.type = apartmentType.id;
    }
    const updatedApartment = {
      ...apartment,
      ...updateApartmentDto,
      type: apartmentType ?? apartment.type,
    };
    return this.apartmentRepository.save(updatedApartment);
  }

  async remove(id: number) {
    const deleteResult = await this.apartmentRepository.delete(id);
    if (!deleteResult.affected)
      throw new NotFoundException('Apartment not found');
    return { deleted: true };
  }
}
