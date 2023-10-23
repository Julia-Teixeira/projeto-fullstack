import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { Client } from '../entities/client.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ClientPrismaRepository implements ClientRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClientDto, image: string): Promise<Client> {
    const client = new Client();
    Object.assign(client, { ...data, image: image });
    const newClient = await this.prisma.client.create({
      data: { ...client },
    });
    return plainToInstance(Client, newClient);
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        contacts: true,
      },
    });
    return plainToInstance(Client, client);
  }

  async findOneByEmail(email: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { email },
      include: {
        contacts: true,
      },
    });
    return client;
  }

  async update(
    id: string,
    data: CreateClientDto,
    image_url: string
  ): Promise<Client> {
    const client = await this.prisma.client.update({
      where: { id },
      data: { ...data, image: image_url },
    });
    return plainToInstance(Client, client);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.client.delete({
      where: { id },
    });
  }
}
