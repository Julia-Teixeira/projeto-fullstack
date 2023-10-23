import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Client } from '../entities/client.entity';

export abstract class ClientRepository {
  abstract create(
    data: CreateClientDto,
    image: string
  ): Promise<Client> | Client;
  abstract findOne(id: string): Promise<Client | undefined> | Client;
  abstract findOneByEmail(email: string): Promise<Client | undefined> | Client;
  abstract update(
    id: string,
    data: UpdateClientDto,
    image: string
  ): Promise<Client> | Client;
  abstract delete(id: string): Promise<void> | void;
}
