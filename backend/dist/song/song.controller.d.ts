/// <reference types="multer" />
import { SongService } from './song.service';
import { UpdateSongDto } from './dto/update-song.dto';
import { CreateSongDto } from './dto/create-song.dto';
export declare class SongController {
    private readonly songService;
    constructor(songService: SongService);
    findAll(): Promise<{
        id: number;
        name: string;
        url: string;
        singer: string;
    }[]>;
    Create(createSongDto: CreateSongDto, file: Express.Multer.File): Promise<{
        id: number;
        name: string;
        url: string;
        singer: string;
    }>;
    update(songId: string, updateSongDto: UpdateSongDto, file: Express.Multer.File): Promise<{
        id: number;
        name: string;
        url: string;
        singer: string;
    }>;
    seeUploadedFile(image: any, res: any): Promise<any>;
    remove(songid: string): Promise<{
        id: number;
        name: string;
        url: string;
        singer: string;
    }>;
}
