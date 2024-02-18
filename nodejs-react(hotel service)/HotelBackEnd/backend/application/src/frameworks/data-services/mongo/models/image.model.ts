import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Image {
  constructor(_imagePath: string) {
    this.imagePath = _imagePath;
  }

  @Field()
  imagePath: string
}

