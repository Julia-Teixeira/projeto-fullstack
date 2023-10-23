import { Module } from '@nestjs/common';
import { ClientModule } from './modules/client/client.module';
import { ContactModule } from './modules/contact/contact.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [ClientModule, ContactModule, AuthModule],
})
export class AppModule {}
