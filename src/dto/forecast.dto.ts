import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Timeframe } from '../models/forecast.model';

export class GetSignForecastDto {
  @ApiProperty({ description: 'Zodiac sign (e.g., "Aries", "Taurus")' })
  @IsString()
  @IsNotEmpty()
  zodiacSign: string;

  @ApiProperty({ description: 'Gender identity' })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    description: 'Timeframe for the forecast',
    enum: Timeframe,
    example: 'week',
  })
  @IsEnum(Timeframe)
  timeframe: Timeframe;
}

export class ForecastResponseDto {
  @ApiProperty()
  zodiacSign: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  timeframe: Timeframe;

  @ApiProperty()
  forecast: string;

  @ApiProperty()
  details: {
    love: string;
    career: string;
    health: string;
    finance: string;
    luck: string;
  };

  @ApiProperty()
  validFrom: Date;

  @ApiProperty()
  validUntil: Date;

  @ApiProperty()
  isGenerated: boolean;

  @ApiProperty()
  lastUpdated: Date;
}
