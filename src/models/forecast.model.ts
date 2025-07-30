import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ForecastDocument = Forecast & Document;

export enum Timeframe {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

@Schema({ timestamps: true })
export class Forecast {
  @Prop({ required: true, index: true })
  zodiacSign: string;

  @Prop({ required: true, index: true })
  gender: string;

  @Prop({ required: true, enum: Timeframe, index: true })
  timeframe: Timeframe;

  @Prop({ required: true })
  forecast: string;

  @Prop({ type: Object })
  details: {
    love: string;
    career: string;
    health: string;
    finance: string;
    luck: string;
  };

  @Prop({ required: true })
  validFrom: Date;

  @Prop({ required: true })
  validUntil: Date;

  @Prop({ default: false })
  isGenerated: boolean;

  @Prop()
  lastUpdated: Date;
}

export const ForecastSchema = SchemaFactory.createForClass(Forecast);
ForecastSchema.index({
  zodiacSign: 1,
  gender: 1,
  timeframe: 1,
  validFrom: 1,
  validUntil: 1,
});
