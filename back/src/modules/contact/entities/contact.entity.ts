import { randomUUID } from 'crypto';

export class Contact {
  readonly id: string;
  full_name: string;
  email: string;
  phone: string;
  image: string;
  client_id: string;

  constructor() {
    this.id = randomUUID();
  }
}
