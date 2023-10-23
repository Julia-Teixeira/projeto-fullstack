import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';

export abstract class ContactRepository {
  abstract create(
    id: string,
    data: CreateContactDto,
    image: string
  ): Promise<Contact>;
  abstract findAll(id: string): Promise<Contact[]>;
  abstract findOne(id: string, client_id: string): Promise<Contact | undefined>;
  abstract findOneByEmail(email: string): Promise<Contact | undefined>;
  abstract findOneByPhone(phone: string): Promise<Contact | undefined>;
  abstract update(
    id: string,
    data: UpdateContactDto,
    image: string
  ): Promise<Contact>;
  abstract delete(id: string, client_id: string): Promise<void>;
}
