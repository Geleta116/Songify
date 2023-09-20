import {
  Controller,
  Get,
  Body,
  Patch,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Res,
  ForbiddenException,
} from '@nestjs/common';
import { SongService } from './song.service';
import { UpdateSongDto } from './dto/update-song.dto';
import { CreateSongDto } from './dto/create-song.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}
  @Get()
  findAll() {
    return this.songService.findAll();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName =
            name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;

          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpeg|jpg|png|gif|pdf)$/)) {
          return cb(null, false);
        }
        cb(null, true);
      },
    }),
  )
  Create(
    @Body() createSongDto: CreateSongDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    if (!file) {
      throw new ForbiddenException('Please upload a file');
    } else {
      const filePathURL = `http://localhost:3000/song/${file.filename}`;
      createSongDto.url = filePathURL;
      return this.songService.create(createSongDto);
    }
  }

  @Patch(':songId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName =
            name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;

          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpeg|jpg|png|gif|pdf)$/)) {
          return cb(null, false);
        }
        cb(null, true);
      },
    }),
  )
  update(
    @Param('songId') songId: string,
    @Body() updateSongDto: UpdateSongDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    if (!file) {
      return this.songService.update(+songId, updateSongDto);
    } else {
      const filePathURL = `http://localhost:3000/song/${file.filename}`;
      updateSongDto.url = filePathURL;
      return this.songService.update(+songId, updateSongDto);
    }
  }

  @Get(':songpath')
  async seeUploadedFile(@Param('songpath') image, @Res() res) {
    return await res.sendFile(image, { root: './uploads' });
  }

  // @UseGuards(LocalAuthGuard)
  @Delete(':songid')
  remove(@Param('songid') songid: string) {
    return this.songService.remove(+songid);
  }
}
