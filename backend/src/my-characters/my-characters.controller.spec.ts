import { Test, TestingModule } from '@nestjs/testing';
import { MyCharactersController } from './my-characters.controller';

describe('MyCharactersController', () => {
  let controller: MyCharactersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyCharactersController],
    }).compile();

    controller = module.get<MyCharactersController>(MyCharactersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
