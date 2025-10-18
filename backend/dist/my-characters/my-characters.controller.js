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
exports.MyCharactersController = void 0;
const common_1 = require("@nestjs/common");
const my_characters_service_1 = require("./my-characters.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let MyCharactersController = class MyCharactersController {
    myCharactersService;
    constructor(myCharactersService) {
        this.myCharactersService = myCharactersService;
    }
    async saveCharacter(req, body) {
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
    async getMyCharacters(req) {
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
    async deleteCharacter(req, characterId) {
        const userId = req.user.id;
        const charIdNum = parseInt(characterId, 10);
        await this.myCharactersService.deleteCharacter(userId, charIdNum);
    }
};
exports.MyCharactersController = MyCharactersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MyCharactersController.prototype, "saveCharacter", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MyCharactersController.prototype, "getMyCharacters", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MyCharactersController.prototype, "deleteCharacter", null);
exports.MyCharactersController = MyCharactersController = __decorate([
    (0, common_1.Controller)('my-characters'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [my_characters_service_1.MyCharactersService])
], MyCharactersController);
//# sourceMappingURL=my-characters.controller.js.map