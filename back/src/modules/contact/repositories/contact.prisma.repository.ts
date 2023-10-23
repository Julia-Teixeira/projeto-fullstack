import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Contact } from '../entities/contact.entity';
import { CreateContactDto } from '../dto/create-contact.dto';
import { ContactRepository } from './contact.repository';
import { UpdateContactDto } from '../dto/update-contact.dto';

@Injectable()
export class ContactPrismaRepository implements ContactRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    id: string,
    data: CreateContactDto,
    image: string
  ): Promise<Contact> {
    const contact = new Contact();
    Object.assign(contact, { ...data });

    const newContact = await this.prisma.contact.create({
      data: { ...contact, image: image, client_id: id },
    });
    return newContact;
  }

  async findAll(id: string): Promise<Contact[]> {
    const contacts: Contact[] = await this.prisma.contact.findMany({
      where: { client_id: id },
    });
    return contacts;
  }

  async findOne(id: string, client_id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findFirst({
      where: { id: id, client_id: client_id },
    });
    return contact;
  }

  async findOneByEmail(email: string): Promise<Contact> {
    const contact = await this.prisma.contact.findFirst({
      where: { email },
    });
    return contact;
  }

  async findOneByPhone(phone: string): Promise<Contact> {
    const contact = await this.prisma.contact.findFirst({
      where: { phone },
    });
    return contact;
  }

  async update(
    id: string,
    data: UpdateContactDto,
    image: string
  ): Promise<Contact> {
    const contact = await this.prisma.contact.update({
      where: { id },
      data: { ...data, image: image },
    });
    return contact;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contact.delete({
      where: { id },
    });
  }
}
