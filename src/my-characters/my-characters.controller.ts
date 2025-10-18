import { Controller, Get, Post, Delete, Body, Param, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { MyCharactersService } from './my-characters.service';

@Controller('my-characters')
export class MyCharactersController {
  constructor(private readonly myCharactersService: MyCharactersService) {}

  @Post()
  async saveCharacter(
    @Headers('user-id') userId: string,
    @Body() body: {
      originalCharacterId: number;
      name: string;
      species: string;
      gender: string;
      origin: string;
      location: string;
      image: string;
      status: string;
    },
  ) {
    const userIdNum = parseInt(userId, 10);
    const character = await this.myCharactersService.saveCharacter(userIdNum, body);

    return {
      id: character.id,
      originalCharacterId: character.originalCharacterId,
      name: character.name,
      species: character.species,
      gender: character.gender,
      origin: character.origin,
      location: character.location,
      image: character.image,
      status: character.status,
    };
  }

  @Get()
  async getMyCharacters(@Headers('user-id') userId: string) {
    const userIdNum = parseInt(userId, 10);
    const characters = await this.myCharactersService.findAllByUser(userIdNum);

    return characters.map(char => ({
      id: char.id,
      originalCharacterId: char.originalCharacterId,
      name: char.name,
      species: char.species,
      gender: char.gender,
      origin: char.origin,
      location: char.location,
      image: char.image,
      status: char.status,
    }));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCharacter(
    @Headers('user-id') userId: string,
    @Param('id') characterId: string,
  ) {
    const userIdNum = parseInt(userId, 10);
    const charIdNum = parseInt(characterId, 10);
    await this.myCharactersService.deleteCharacter(userIdNum, charIdNum);
  }
}
