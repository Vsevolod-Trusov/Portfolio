import { Image } from './image.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type UserDocument = User & Document;

@ObjectType()
@Schema({versionKey: false})
export class User {
  @Field()
  @Prop({required: true, unique: true, minlength: 3, maxlength: 30})
  login: string;

  @Field()
  @Prop({required: true, minlength: 5})
  password: string;

  @Field()
  @Prop({required: true, validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/})
  email: string;

  @Field()
  @Prop({required: true, enum: ['user', 'admin']})
  role: string;

  @Field(() => Image)
  @Prop({default: 'test/path'})
  avatar: Image;

  @Field({nullable: true})
  @Prop({default: false})
  subscribedOnNews: boolean;

  @Field({nullable: true})
  @Prop({nullable: true})
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
