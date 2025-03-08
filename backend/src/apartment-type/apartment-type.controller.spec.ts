import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentTypeController } from './apartment-type.controller';
import { ApartmentTypeService } from './apartment-type.service';

describe('ApartmentTypeController', () => {
  let controller: ApartmentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApartmentTypeController],
      providers: [ApartmentTypeService],
    }).compile();

    controller = module.get<ApartmentTypeController>(ApartmentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
