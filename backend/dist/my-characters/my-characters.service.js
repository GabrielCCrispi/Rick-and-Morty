"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyCharactersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const favorite_character_entity_1 = require("./favorite-character.entity");
const user_entity_1 = require("../auth/user.entity");
let MyCharactersService = class MyCharactersService {
    characterRepository;
    userRepository;
    constructor(characterRepository, userRepository) {
        this.characterRepository = characterRepository;
        this.userRepository = userRepository;
    }
    async saveCharacter(userId, characterData) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const existing = await this.characterRepository.findOne({
            where: {
                user: { id: userId },
                originalCharacterId: characterData.originalCharacterId,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Personagem já salvo nos favoritos');
        }
        const character = this.characterRepository.create({
            ...characterData,
            user,
        });
        return await this.characterRepository.save(character);
    }
    async findAllByUser(userId) {
        return await this.characterRepository.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
        });
    }
    async deleteCharacter(userId, characterId) {
        const character = await this.characterRepository.findOne({
            where: { id: characterId, user: { id: userId } },
        });
        if (!character) {
            throw new common_1.NotFoundException('Personagem não encontrado');
        }
        await this.characterRepository.remove(character);
    }
};
exports.MyCharactersService = MyCharactersService;
exports.MyCharactersService = MyCharactersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(favorite_character_entity_1.FavoriteCharacter)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MyCharactersService);
//# sourceMappingURL=my-characters.service.js.map