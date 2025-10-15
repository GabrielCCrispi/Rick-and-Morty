import { Test, TestingModule } from '@nestjs/testing';
import { MyCharactersService } from './my-characters.service';

describe('MyCharactersService', () => {
  let service: MyCharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyCharactersService],
    }).compile();

    service = module.get<MyCharactersService>(MyCharactersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
