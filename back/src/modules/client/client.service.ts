import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from './repositories/client.repository';
import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs';

@Injectable()
export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  async create(
    createClientDto: CreateClientDto,
    image_file: Express.Multer.File
  ) {
    const findClient = await this.clientRepository.findOneByEmail(
      createClientDto.email
    );
    if (findClient) {
      throw new ConflictException('Cliente já existe!');
    }

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    let image_url =
      'https://res.cloudinary.com/dy1df0vcx/image/upload/v1685306215/user_image_xhxke1.png';

    if (image_file) {
      const uploadImage = await cloudinary.uploader.upload(
        image_file.path,
        { resource_type: 'image' },
        (error, result) => {
          return result;
        }
      );

      unlink(image_file.path, (error) => {
        if (error) console.log(error);
      });

      image_url = uploadImage.secure_url;
    }

    const client = await this.clientRepository.create(
      {
        ...createClientDto,
      },
      image_url
    );
    return client;
  }

  async findOne(id: string) {
    const findClient = await this.clientRepository.findOne(id);
    if (!findClient) {
      throw new NotFoundException('Cliente não encontrado!');
    }
    return findClient;
  }

  async findOneByEmail(email: string) {
    const findClient = await this.clientRepository.findOneByEmail(email);
    if (findClient) {
      throw new ConflictException('Cliente já existe!');
    }
    return findClient;
  }

  async findByEmail(email: string) {
    const findClient = await this.clientRepository.findOneByEmail(email);
    if (findClient) {
      return findClient;
    }
    return null;
  }
  async update(
    id: string,
    updateClientDto: UpdateClientDto,
    image_file: Express.Multer.File
  ) {
    const findClient = await this.clientRepository.findOne(id);
    if (!findClient) {
      throw new NotFoundException('Cliente não encontrado');
    }

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    let image_url = findClient.image;

    if (image_file) {
      const uploadImage = await cloudinary.uploader.upload(
        image_file.path,
        { resource_type: 'image' },
        (error, result) => {
          return result;
        }
      );

      unlink(image_file.path, (error) => {
        if (error) console.log(error);
      });

      image_url = uploadImage.secure_url;
    }

    const updatedClient = await this.clientRepository.update(
      id,
      updateClientDto,
      image_url
    );
    return updatedClient;
  }

  async remove(id: string) {
    const findClient = await this.clientRepository.findOne(id);
    if (!findClient) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return await this.clientRepository.delete(id);
  }
}
