import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PersonalityDescriptionDocument = PersonalityDescription & Document;

@Schema({ timestamps: true })
export class PersonalityDescription {
  @Prop({ required: true, index: true })
  zodiacSign: string;

  @Prop({ required: true, index: true })
  gender: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Object })
  traits: {
    strengths: string[];
    weaknesses: string[];
    compatibility: string[];
    career: string[];
    love: string[];
  };

  @Prop({ default: false })
  isGenerated: boolean;

  @Prop()
  lastUpdated: Date;
}

export const PersonalityDescriptionSchema = SchemaFactory.createForClass(
  PersonalityDescription,
);
PersonalityDescriptionSchema.index(
  { zodiacSign: 1, gender: 1 },
  { unique: true },
);
