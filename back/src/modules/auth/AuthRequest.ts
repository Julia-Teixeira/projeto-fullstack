import { Client } from '../client/entities/client.entity';
import { Request } from 'express';

export interface AuthRequest extends Request {
  client: Client;
}
