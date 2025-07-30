import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetSignDescriptionDto {
  @ApiProperty({ description: 'Zodiac sign (e.g., "Aries", "Taurus")' })
  @IsString()
  @IsNotEmpty()
  zodiacSign: string;

  @ApiProperty({ description: 'Gender identity' })
  @IsString()
  @IsNotEmpty()
  gender: string;
}

export class PersonalityDescriptionResponseDto {
  @ApiProperty()
  zodiacSign: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  traits: {
    strengths: string[];
    weaknesses: string[];
    compatibility: string[];
    career: string[];
    love: string[];
  };

  @ApiProperty()
  isGenerated: boolean;

  @ApiProperty()
  lastUpdated: Date;
}
