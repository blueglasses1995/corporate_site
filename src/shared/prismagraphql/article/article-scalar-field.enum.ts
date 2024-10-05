import { registerEnumType } from '@nestjs/graphql';

export enum ArticleScalarFieldEnum {
  id = 'id',
  title = 'title',
  content = 'content',
  views = 'views',
  categoryId = 'categoryId',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(ArticleScalarFieldEnum, {
  name: 'ArticleScalarFieldEnum',
  description: undefined,
});
