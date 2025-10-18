import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteCharacter } from './favorite-character.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class MyCharactersService {
  constructor(
    @InjectRepository(FavoriteCharacter)
    private characterRepository: Repository<FavoriteCharacter>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async saveCharacter(
    userId: number,
    characterData: {
      originalCharacterId: number;
      name: string;
      species: string;
      gender: string;
      origin: string;
      location: string;
      image: string;
      status: string;
    },
  ): Promise<FavoriteCharacter> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar se o personagem já está salvo
    const existing = await this.characterRepository.findOne({
      where: {
        user: { id: userId },
        originalCharacterId: characterData.originalCharacterId,
      },
    });

    if (existing) {
      throw new ConflictException('Personagem já salvo nos favoritos');
    }

    const character = this.characterRepository.create({
      ...characterData,
      user,
    });

    return await this.characterRepository.save(character);
  }

  async findAllByUser(userId: number): Promise<FavoriteCharacter[]> {
    return await this.characterRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async deleteCharacter(userId: number, characterId: number): Promise<void> {
    const character = await this.characterRepository.findOne({
      where: { id: characterId, user: { id: userId } },
    });

    if (!character) {
      throw new NotFoundException('Personagem não encontrado');
    }

    await this.characterRepository.remove(character);
  }
}
