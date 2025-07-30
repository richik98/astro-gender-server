import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ForecastResponseDto, GetSignForecastDto } from '../dto/forecast.dto';
import {
  GetSignDescriptionDto,
  PersonalityDescriptionResponseDto,
} from '../dto/personality-description.dto';
import {
  DetectZodiacSignDto,
  ZodiacDetectionResponseDto,
} from '../dto/zodiac-detection.dto';
import { ForecastService } from '../services/forecast.service';
import { PersonalityDescriptionService } from '../services/personality-description.service';
import { ZodiacDetectionService } from '../services/zodiac-detection.service';

@ApiTags('Astrology API')
@Controller('astrology')
export class AstrologyController {
  private readonly logger = new Logger(AstrologyController.name);

  constructor(
    private readonly zodiacDetectionService: ZodiacDetectionService,
    private readonly personalityDescriptionService: PersonalityDescriptionService,
    private readonly forecastService: ForecastService,
  ) {}

  @Post('detect_zodiac_sign')
  @ApiOperation({ summary: 'Detect zodiac sign based on birth information' })
  @ApiBody({ type: DetectZodiacSignDto })
  @ApiResponse({
    status: 201,
    description: 'Zodiac sign detected successfully',
    type: ZodiacDetectionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async detectZodiacSign(
    @Body(ValidationPipe) dto: DetectZodiacSignDto,
  ): Promise<ZodiacDetectionResponseDto> {
    try {
      this.logger.log(
        `Detecting zodiac sign for location: ${dto.location}, date: ${dto.birthDate}, time: ${dto.birthTime}`,
      );

      const result = await this.zodiacDetectionService.detectZodiacSign(dto);

      this.logger.log(
        `Successfully detected zodiac sign: ${result.zodiacSign}`,
      );
      return result;
    } catch (error) {
      this.logger.error(`Error detecting zodiac sign: ${error.message}`);
      throw new HttpException(
        'Failed to detect zodiac sign',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('get_sign_description')
  @ApiOperation({
    summary: 'Get personality description for zodiac sign and gender',
  })
  @ApiBody({ type: GetSignDescriptionDto })
  @ApiResponse({
    status: 201,
    description: 'Personality description retrieved successfully',
    type: PersonalityDescriptionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getSignDescription(
    @Body(ValidationPipe) dto: GetSignDescriptionDto,
  ): Promise<PersonalityDescriptionResponseDto> {
    try {
      this.logger.log(
        `Getting personality description for ${dto.gender} ${dto.zodiacSign}`,
      );

      const result =
        await this.personalityDescriptionService.getSignDescription(dto);

      this.logger.log(
        `Successfully retrieved personality description for ${dto.gender} ${dto.zodiacSign}`,
      );
      return result;
    } catch (error) {
      this.logger.error(
        `Error getting personality description: ${error.message}`,
      );
      throw new HttpException(
        'Failed to get personality description',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('get_sign_forecast')
  @ApiOperation({
    summary: 'Get forecast for zodiac sign, gender, and timeframe',
  })
  @ApiBody({ type: GetSignForecastDto })
  @ApiResponse({
    status: 201,
    description: 'Forecast retrieved successfully',
    type: ForecastResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getSignForecast(
    @Body(ValidationPipe) dto: GetSignForecastDto,
  ): Promise<ForecastResponseDto> {
    try {
      this.logger.log(
        `Getting ${dto.timeframe} forecast for ${dto.gender} ${dto.zodiacSign}`,
      );

      const result = await this.forecastService.getSignForecast(dto);

      this.logger.log(
        `Successfully retrieved ${dto.timeframe} forecast for ${dto.gender} ${dto.zodiacSign}`,
      );
      return result;
    } catch (error) {
      this.logger.error(`Error getting forecast: ${error.message}`);
      throw new HttpException(
        'Failed to get forecast',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
