import { MyCharactersService } from './my-characters.service';
export declare class MyCharactersController {
    private readonly myCharactersService;
    constructor(myCharactersService: MyCharactersService);
    saveCharacter(req: any, body: {
        originalCharacterId: number;
        name: string;
        species: string;
        gender: string;
        origin: string;
        location: string;
        image: string;
        status: string;
    }): unknown;
    getMyCharacters(req: any): unknown;
    deleteCharacter(req: any, characterId: string): any;
}
