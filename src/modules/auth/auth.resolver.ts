import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from '../../user/user.service';
import { LoginArgs } from '../../shared/customType/args/login.args';
import { LoginData } from '../../shared/customType/returnType/returnType';
import { CreateOneUserArgs, User } from '../../shared/prismagraphql/user';
@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => LoginData, { nullable: false })
  async login(@Args() args: LoginArgs) {
    return this.userService.login(args);
  }
  @Mutation(() => User, { nullable: false })
  registerUser(@Args() args: CreateOneUserArgs) {
    return this.userService.create(args);
  }
}
