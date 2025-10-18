import { Repository } from 'typeorm';
import { FavoriteCharacter } from './favorite-character.entity';
import { User } from '../auth/user.entity';
export declare class MyCharactersService {
    private characterRepository;
    private userRepository;
    constructor(characterRepository: Repository<FavoriteCharacter>, userRepository: Repository<User>);
    saveCharacter(userId: number, characterData: {
        originalCharacterId: number;
        name: string;
        species: string;
        gender: string;
        origin: string;
        location: string;
        image: string;
        status: string;
    }): Promise<FavoriteCharacter>;
    findAllByUser(userId: number): Promise<FavoriteCharacter[]>;
    deleteCharacter(userId: number, characterId: number): Promise<void>;
}
