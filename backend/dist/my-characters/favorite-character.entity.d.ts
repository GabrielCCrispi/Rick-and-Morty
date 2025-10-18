import { User } from '../auth/user.entity';
export declare class FavoriteCharacter {
    id: number;
    originalCharacterId: number;
    name: string;
    species: string;
    gender: string;
    origin: string;
    location: string;
    image: string;
    status: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
