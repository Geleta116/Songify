import { UpdateSongDto } from './dto/update-song.dto';
import { CreateSongDto } from './dto/create-song.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SongService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        name: string;
        url: string;
        singer: string;
    }[]>;
    findOne(songId: number): Promise<{
        id: number;
        name: string;
        url: string;
        singer: string;
    }>;
    create(createSongDto: CreateSongDto): Promise<{
        id: number;
        name: string;
        url: string;
        singer: string;
    }>;
    update(songId: number, updateSongDto: UpdateSongDto): Promise<{
        id: number;
        name: string;
        url: string;
        singer: string;
    }>;
    remove(songId: number): Promise<{
        id: number;
        name: string;
        url: string;
        singer: string;
    }>;
}
