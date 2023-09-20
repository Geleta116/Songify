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
exports.SongController = void 0;
const common_1 = require("@nestjs/common");
const song_service_1 = require("./song.service");
const update_song_dto_1 = require("./dto/update-song.dto");
const create_song_dto_1 = require("./dto/create-song.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let SongController = class SongController {
    constructor(songService) {
        this.songService = songService;
    }
    findAll() {
        return this.songService.findAll();
    }
    Create(createSongDto, file) {
        if (!file) {
            throw new common_1.ForbiddenException('Please upload a file');
        }
        else {
            const filePathURL = `http://localhost:3000/song/${file.filename}`;
            createSongDto.url = filePathURL;
            return this.songService.create(createSongDto);
        }
    }
    update(songId, updateSongDto, file) {
        if (!file) {
            return this.songService.update(+songId, updateSongDto);
        }
        else {
            const filePathURL = `http://localhost:3000/song/${file.filename}`;
            updateSongDto.url = filePathURL;
            return this.songService.update(+songId, updateSongDto);
        }
    }
    async seeUploadedFile(image, res) {
        return await res.sendFile(image, { root: './uploads' });
    }
    remove(songid) {
        return this.songService.remove(+songid);
    }
};
exports.SongController = SongController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SongController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const name = file.originalname.split('.')[0];
                const fileExtension = file.originalname.split('.')[1];
                const newFileName = name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;
                cb(null, newFileName);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/\.(jpeg|jpg|png|gif|pdf)$/)) {
                return cb(null, false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_song_dto_1.CreateSongDto, Object]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "Create", null);
__decorate([
    (0, common_1.Patch)(':songId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const name = file.originalname.split('.')[0];
                const fileExtension = file.originalname.split('.')[1];
                const newFileName = name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;
                cb(null, newFileName);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/\.(jpeg|jpg|png|gif|pdf)$/)) {
                return cb(null, false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.Param)('songId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_song_dto_1.UpdateSongDto, Object]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':songpath'),
    __param(0, (0, common_1.Param)('songpath')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "seeUploadedFile", null);
__decorate([
    (0, common_1.Delete)(':songid'),
    __param(0, (0, common_1.Param)('songid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "remove", null);
exports.SongController = SongController = __decorate([
    (0, common_1.Controller)('song'),
    __metadata("design:paramtypes", [song_service_1.SongService])
], SongController);
//# sourceMappingURL=song.controller.js.map