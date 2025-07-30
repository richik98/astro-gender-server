import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ZodiacSignDocument = ZodiacSign & Document;

@Schema({ timestamps: true })
export class ZodiacSign {
  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  birthTime: string;

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: true })
  zodiacSign: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;
}

export const ZodiacSignSchema = SchemaFactory.createForClass(ZodiacSign); 