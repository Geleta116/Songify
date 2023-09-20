import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateSongDto } from './dto/update-song.dto';
import { CreateSongDto } from './dto/create-song.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SongService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.songs.findMany();
  }

  async findOne(songId: number) {
    const song = await this.prisma.songs.findUnique({
      where: {
        id: songId,
      },
    });
    if (song) {
      return song;
    } else {
      throw new ForbiddenException('Song not Found');
    }
  }
  async create(createSongDto: CreateSongDto) {
    try {
      const song = await this.prisma.songs.create({
        data: {
          ...createSongDto,
        },
      });
      return song;
    } catch (err) {
      throw new ForbiddenException('Cannot Create Song');
    }
  }

  async update(songId: number, updateSongDto: UpdateSongDto) {
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
    } else {
      throw new ForbiddenException('Song not found');
    }
  }

  async remove(songId: number) {
    const foundSong = await this.findOne(songId);
    if (foundSong) {
      const song = await this.prisma.songs.delete({
        where: {
          id: songId,
        },
      });

      return song;
    } else {
      throw new ForbiddenException('Song not found');
    }
  }
}
