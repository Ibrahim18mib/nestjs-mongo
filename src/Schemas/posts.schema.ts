import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Posts {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  contents: string;
}

export const PostSchemas = SchemaFactory.createForClass(Posts);
