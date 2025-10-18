import { Controller, Get, Post, Delete, Body, Param, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { MyCharactersService } from './my-characters.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('my-characters')
@UseGuards(JwtAuthGuard)
export class MyCharactersController {
  constructor(private readonly myCharactersService: MyCharactersService) {}

  @Post()
  async saveCharacter(
    @Request() req,
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
    const userId = req.user.id;
    const character = await this.myCharactersService.saveCharacter(userId, body);

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
  async getMyCharacters(@Request() req) {
    const userId = req.user.id;
    const characters = await this.myCharactersService.findAllByUser(userId);

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
    @Request() req,
    @Param('id') characterId: string,
  ) {
    const userId = req.user.id;
    const charIdNum = parseInt(characterId, 10);
    await this.myCharactersService.deleteCharacter(userId, charIdNum);
  }
}
