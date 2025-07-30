import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DetectZodiacSignDto {
  @ApiProperty({ description: 'Location of birth (e.g., "New York, NY")' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'Birth time in HH:MM format (e.g., "14:30")' })
  @IsString()
  @IsNotEmpty()
  birthTime: string;

  @ApiProperty({
    description: 'Birth date in YYYY-MM-DD format (e.g., "1990-05-15")',
  })
  @IsString()
  @IsNotEmpty()
  birthDate: string;
}

export class ZodiacDetectionResponseDto {
  @ApiProperty()
  zodiacSign: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  birthTime: string;

  @ApiProperty()
  birthDate: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;
}
