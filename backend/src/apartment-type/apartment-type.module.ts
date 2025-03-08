import { Module } from '@nestjs/common';
import { ApartmentTypeService } from './apartment-type.service';
import { ApartmentTypeController } from './apartment-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentType } from './entities/apartment-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApartmentType])],
  controllers: [ApartmentTypeController],
  providers: [ApartmentTypeService],
})
export class ApartmentTypeModule {}
