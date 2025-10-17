import { Module } from '@nestjs/common';
import { MyCharactersController } from './my-characters.controller';
import { MyCharactersService } from './my-characters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteCharacter } from './favorite-character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteCharacter])], 
  controllers: [MyCharactersController],
  providers: [MyCharactersService]
})
export class MyCharactersModule {}
