import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactRepository } from './repositories/contact.repository';
import { ClientRepository } from '../client/repositories/client.repository';
import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs';

@Injectable()
export class ContactService {
  constructor(
    private contactRepository: ContactRepository,
    private clientRepository: ClientRepository
  ) {}

  async create(
    id: string,
    createContactDto: CreateContactDto,
    image_file: Express.Multer.File
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const findClient = await this.clientRepository.findOne(id);
    if (!findClient) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const findContactEmail = await this.contactRepository.findOneByEmail(
      createContactDto.email
    );
    if (findContactEmail) {
      throw new ConflictException('Contato com este email já cadastrado!');
    }

    const findContactPhone = await this.contactRepository.findOneByPhone(
      createContactDto.phone
    );
    if (findContactPhone) {
      throw new ConflictException('Contato com este telefone já cadastrado!');
    }

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

    const contact = await this.contactRepository.create(
      id,
      createContactDto,
      image_url
    );

    return contact;
  }

  async findAll(id: string) {
    return await this.contactRepository.findAll(id);
  }

  async findOne(id: string, client_id: string) {
    const findContact = await this.contactRepository.findOne(id, client_id);
    if (!findContact) {
      throw new NotFoundException('Contato não encontrado');
    }
    return findContact;
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
    client_id: string,
    image_file: Express.Multer.File
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    let image;
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

      image = uploadImage.secure_url;
    }

    const findContact = await this.contactRepository.findOne(id, client_id);
    if (!findContact) {
      throw new NotFoundException('Contato não encontrado');
    }

    if (!image) {
      image = findContact.image;
    }

    const updatedContact = await this.contactRepository.update(
      id,
      updateContactDto,
      image
    );
    return updatedContact;
  }

  async remove(id: string, client_id: string) {
    const findContact = await this.contactRepository.findOne(id, client_id);
    if (!findContact) {
      throw new NotFoundException('Contato não encontrado');
    }

    return await this.contactRepository.delete(id, client_id);
  }
}
