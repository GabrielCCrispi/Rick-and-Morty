import { Module } from '@nestjs/common';
import { MyCharactersController } from './my-characters.controller';
import { MyCharactersService } from './my-characters.service';

@Module({
  controllers: [MyCharactersController],
  providers: [MyCharactersService]
})
export class MyCharactersModule {}
