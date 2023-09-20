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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SongService = class SongService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return await this.prisma.songs.findMany();
    }
    async findOne(songId) {
        const song = await this.prisma.songs.findUnique({
            where: {
                id: songId,
            },
        });
        if (song) {
            return song;
        }
        else {
            throw new common_1.ForbiddenException('Song not Found');
        }
    }
    async create(createSongDto) {
        try {
            const song = await this.prisma.songs.create({
                data: {
                    ...createSongDto,
                },
            });
            return song;
        }
        catch (err) {
            throw new common_1.ForbiddenException('Cannot Create Song');
        }
    }
    async update(songId, updateSongDto) {
        const foundSong = await this.findOne(songId);
        console.log(updateSongDto);
        if (foundSong) {
            const song = await this.prisma.songs.update({
                where: {
                    id: songId,
                },
                data: {
                    ...updateSongDto,
                },
            });
            return song;
        }
        else {
            throw new common_1.ForbiddenException('Song not found');
        }
    }
    async remove(songId) {
        const foundSong = await this.findOne(songId);
        if (foundSong) {
            const song = await this.prisma.songs.delete({
                where: {
                    id: songId,
                },
            });
            return song;
        }
        else {
            throw new common_1.ForbiddenException('Song not found');
        }
    }
};
exports.SongService = SongService;
exports.SongService = SongService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SongService);
//# sourceMappingURL=song.service.js.map