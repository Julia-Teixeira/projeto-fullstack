import { Injectable } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientService,
    private jwtService: JwtService
  ) {}

  async validateClient(email: string, password: string) {
    const client = await this.clientService.findByEmail(email);
    if (client) {
      const passwordMatch = await compare(password, client.password);
      if (passwordMatch) {
        return { id: client.id, email: client.email };
      }
    }
    return null;
  }

  async login(email: string) {
    const findClient = await this.clientService.findByEmail(email);

    return {
      token: this.jwtService.sign({ email }, { subject: findClient.id }),
    };
  }
}
