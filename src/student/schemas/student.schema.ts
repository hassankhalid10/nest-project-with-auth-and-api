import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({
  timestamps: true,
})
export class Student {
  @Prop()
  name: string;

  @Prop()
  class: string;

}

export const StudentSchema = SchemaFactory.createForClass(Student);
