import { BadRequestException, Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientRepository } from './repositories/client.repository';
import { ClientPrismaRepository } from './repositories/client.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './tmp',
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only jpeg or jpg format allowed'), false);
        }
      },
    }),
  ],
  controllers: [ClientController],
  providers: [
    ClientService,
    PrismaService,
    { provide: ClientRepository, useClass: ClientPrismaRepository },
  ],
  exports: [ClientService],
})
export class ClientModule {}
