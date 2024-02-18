import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ImageInput } from './image.input';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class UserInput {
  @Field()
  login: string

  @Field({nullable: true})
  password: string

  @Field({nullable: true})
  role: string

  @Field({nullable: true})
  email: string

  @Field(() => ImageInput, {nullable: true})
  avatar: ImageInput

  @Field({nullable: true})
  subscribedOnNews: boolean

  @Field({nullable: true})
  refreshToken: string;
}

@ObjectType()
export class UserOutput {
  @Field(() => String)
  accessToken: string

  @Field(() => String)
  refreshToken: string

  @Field(() => String)
  role: string


  @Field(() => String)
  login: string


  @Field(() => String)
  email: string

  @Field(() => Boolean)
  subscribedOnNews: boolean
}


@ObjectType()
export class AccessTokenOutput {
  @Field(() => String)
  login: string

  @Field(() => String)
  role: string
}
