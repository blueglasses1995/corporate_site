import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      playground: process.env.ENV === 'dev',
      context: ({ req }) => ({ request: req }),
    }),
    AuthModule,
    SharedModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, UserService, PrismaService],
})
export class AppModule {}
