import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  Request,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { CurrentClient } from '../auth/decorators/current-client.decorator';
import { Client } from '../client/entities/client.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@ApiBearerAuth()
@ApiTags('Contact')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('contact')
@UseGuards(JwtAuthGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile()
    image: Express.Multer.File,
    @CurrentClient() client: Client,
    @Body() createContactDto: CreateContactDto
  ) {
    return this.contactService.create(client.id, createContactDto, image);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(@Request() req: Request, @CurrentClient() client: Client) {
    return this.contactService.findAll(client.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string, @CurrentClient() client: Client) {
    return this.contactService.findOne(id, client.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @UploadedFile()
    image: Express.Multer.File,
    @Body() updateContactDto: UpdateContactDto,
    @CurrentClient() client: Client
  ) {
    return this.contactService.update(id, updateContactDto, client.id, image);
  }

  @HttpCode(204)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string, @CurrentClient() client: Client) {
    return this.contactService.remove(id, client.id);
  }
}
