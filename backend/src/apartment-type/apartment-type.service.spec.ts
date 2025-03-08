import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentTypeService } from './apartment-type.service';

describe('ApartmentTypeService', () => {
  let service: ApartmentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApartmentTypeService],
    }).compile();

    service = module.get<ApartmentTypeService>(ApartmentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
