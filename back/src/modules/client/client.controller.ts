import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  HttpCode,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CurrentClient } from '../auth/decorators/current-client.decorator';
import { Client } from './entities/client.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile()
    image: Express.Multer.File,
    @Body() createClientDto: CreateClientDto
  ) {
    return await this.clientService.create(createClientDto, image);
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@CurrentClient() client: Client) {
    return await this.clientService.findOne(client.id);
  }

  @Patch('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @CurrentClient() client: Client,
    @Body() updateClientDto: UpdateClientDto,
    @UploadedFile()
    image: Express.Multer.File
  ) {
    return await this.clientService.update(client.id, updateClientDto, image);
  }

  @HttpCode(204)
  @Delete('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@CurrentClient() client: Client) {
    return await this.clientService.remove(client.id);
  }
}
