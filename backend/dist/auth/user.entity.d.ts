import { FavoriteCharacter } from 'src/my-characters/favorite-character.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    favoriteCharacters: FavoriteCharacter[];
    createdAt: Date;
    updatedAt: Date;
}
