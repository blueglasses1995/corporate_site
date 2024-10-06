import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({})
export class UserModule {
  providers: [UserResolver, UserService];
}
