import { registerEnumType } from '@nestjs/graphql';

export enum ArticleScalarFieldEnum {
    id = "id",
    title = "title",
    description = "description",
    body = "body",
    published = "published",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(ArticleScalarFieldEnum, { name: 'ArticleScalarFieldEnum', description: undefined })
