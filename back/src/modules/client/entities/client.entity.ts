import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class Client {
  readonly id: string;
  full_name: string;
  email: string;
  phone: string;
  image: string;

  readonly created_at: Date;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
  }
}
