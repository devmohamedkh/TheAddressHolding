import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from './entities/apartment.entity';
import { ApartmentType } from 'src/apartment-type/entities/apartment-type.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Apartment]), TypeOrmModule.forFeature([ApartmentType])], 
  controllers: [ApartmentController],
  providers: [ApartmentService], 
})
export class ApartmentModule {}
