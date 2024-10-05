import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { Type } from 'class-transformer';
import { CommentUpdateWithoutUserInput } from './comment-update-without-user.input';
import { CommentCreateWithoutUserInput } from './comment-create-without-user.input';

@InputType()
export class CommentUpsertWithWhereUniqueWithoutUserInput {
  @Field(() => CommentWhereUniqueInput, { nullable: false })
  @Type(() => CommentWhereUniqueInput)
  where!: Prisma.AtLeast<CommentWhereUniqueInput, 'id'>;

  @Field(() => CommentUpdateWithoutUserInput, { nullable: false })
  @Type(() => CommentUpdateWithoutUserInput)
  update!: CommentUpdateWithoutUserInput;

  @Field(() => CommentCreateWithoutUserInput, { nullable: false })
  @Type(() => CommentCreateWithoutUserInput)
  create!: CommentCreateWithoutUserInput;
}
