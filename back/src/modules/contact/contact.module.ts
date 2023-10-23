import { BadRequestException, Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactRepository } from './repositories/contact.repository';
import { ContactPrismaRepository } from './repositories/contact.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';
import { ClientRepository } from '../client/repositories/client.repository';
import { ClientPrismaRepository } from '../client/repositories/client.prisma.repository';
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
  controllers: [ContactController],
  providers: [
    ContactService,
    PrismaService,
    {
      provide: ContactRepository,
      useClass: ContactPrismaRepository,
    },
    {
      provide: ClientRepository,
      useClass: ClientPrismaRepository,
    },
  ],
  exports: [ContactService],
})
export class ContactModule {}
