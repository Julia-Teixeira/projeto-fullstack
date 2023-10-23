import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthRequest } from '../AuthRequest';

export const CurrentClient = createParamDecorator(
  (data: unknown, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  }
);
