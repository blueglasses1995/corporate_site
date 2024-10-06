import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BaseCrudService } from '../base.service';
import * as bcrypt from 'bcrypt';
import {
  CreateManyUserArgs,
  CreateOneUserArgs,
  DeleteManyUserArgs,
  DeleteOneUserArgs,
  FindFirstUserArgs,
  FindManyUserArgs,
  FindUniqueUserArgs,
  UpdateManyUserArgs,
  UpdateOneUserArgs,
  User,
  UserAggregateArgs,
  UserGroupByArgs,
} from '../shared/prismagraphql/user';
import { LoginArgs } from 'src/shared/customType/args/login.args';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService extends BaseCrudService<
  User,
  FindFirstUserArgs,
  FindUniqueUserArgs,
  FindManyUserArgs,
  UserGroupByArgs,
  UserAggregateArgs,
  CreateOneUserArgs,
  CreateManyUserArgs,
  UpdateOneUserArgs,
  UpdateManyUserArgs,
  DeleteOneUserArgs,
  DeleteManyUserArgs
> {
  private saltRounds = 10;
  constructor(
    prisma: PrismaService,
    readonly jwtService: JwtService,
  ) {
    super(prisma);
  }

  async login(args: LoginArgs) {
    const user = await this.prisma.user.findFirst({
      where: { email: args.email },
    });
    if (user) {
      if (await bcrypt.compare(args.password, user.password)) {
        const payload = { sub: user.id, email: user.email, name: user.name };
        return {
          status: true,
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    }
    return { status: false, error: 'Invalid Email or Password' };
  }
  async create(args: Prisma.UserCreateArgs): Promise<User> {
    args.data.password = await bcrypt.hash(args.data.password, this.saltRounds);
    return this.prisma.user.create(args);
  }

  async createMany(args: Prisma.UserCreateManyArgs) {
    if (Array.isArray(args.data)) {
      for (let i = 0; i < args.data.length; i++) {
        args.data[i].password = await bcrypt.hash(
          args.data[i].password,
          this.saltRounds,
        );
      }
    }

    return this.prisma.user.createMany(args);
  }

  async update(args: Prisma.UserUpdateArgs): Promise<User> {
    return this.prisma.user.update(args);
  }

  async updateMany(args: Prisma.UserUpdateManyArgs): Promise<any> {
    if (Array.isArray(args.data)) {
      for (let i = 0; i < args.data.length; i++) {
        if (args.data[i].password) {
          args.data[i].password = await bcrypt.hash(
            args.data[i].password,
            this.saltRounds,
          );
        }
      }
    }
    return this.prisma.user.updateMany(args);
  }
}
