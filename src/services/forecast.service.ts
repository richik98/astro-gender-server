import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForecastResponseDto, GetSignForecastDto } from '../dto/forecast.dto';
import {
  Forecast,
  ForecastDocument,
  Timeframe,
} from '../models/forecast.model';
import { OpenAIService } from './openai.service';

@Injectable()
export class ForecastService {
  private readonly logger = new Logger(ForecastService.name);

  constructor(
    @InjectModel(Forecast.name) private forecastModel: Model<ForecastDocument>,
    private openAIService: OpenAIService,
  ) {}

  async getSignForecast(dto: GetSignForecastDto): Promise<ForecastResponseDto> {
    const { zodiacSign, gender, timeframe } = dto;

    // Calculate validity period based on timeframe
    const { validFrom, validUntil } = this.calculateValidityPeriod(timeframe);

    // Check if we have a valid forecast in the database
    let forecast = await this.forecastModel.findOne({
      zodiacSign: zodiacSign.toLowerCase(),
      gender: gender.toLowerCase(),
      timeframe,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() },
    });

    // If not found or expired, generate new forecast
    if (!forecast) {
      this.logger.log(
        `Generating new ${timeframe} forecast for ${gender} ${zodiacSign}`,
      );

      try {
        const generatedContent = await this.openAIService.generateForecast(
          zodiacSign,
          gender,
          timeframe,
        );

        // Save to database
        forecast = new this.forecastModel({
          zodiacSign: zodiacSign.toLowerCase(),
          gender: gender.toLowerCase(),
          timeframe,
          forecast: generatedContent.forecast,
          details: generatedContent.details,
          validFrom,
          validUntil,
          isGenerated: true,
          lastUpdated: new Date(),
        });
        await forecast.save();

        this.logger.log(
          `Successfully generated and saved ${timeframe} forecast for ${gender} ${zodiacSign}`,
        );
      } catch (error) {
        this.logger.error(`Failed to generate forecast: ${error.message}`);
        throw new Error('Failed to generate forecast');
      }
    } else {
      this.logger.log(
        `Retrieved cached ${timeframe} forecast for ${gender} ${zodiacSign}`,
      );
    }

    return {
      zodiacSign: forecast.zodiacSign,
      gender: forecast.gender,
      timeframe: forecast.timeframe,
      forecast: forecast.forecast,
      details: forecast.details,
      validFrom: forecast.validFrom,
      validUntil: forecast.validUntil,
      isGenerated: forecast.isGenerated,
      lastUpdated: forecast.lastUpdated,
    };
  }

  private calculateValidityPeriod(timeframe: Timeframe): {
    validFrom: Date;
    validUntil: Date;
  } {
    const now = new Date();
    let validFrom: Date;
    let validUntil: Date;

    switch (timeframe) {
      case Timeframe.DAY:
        validFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        validUntil = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() + 1,
        );
        break;

      //TODO: count week from monday, not from the day of request.
      case Timeframe.WEEK:
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        validFrom = new Date(
          startOfWeek.getFullYear(),
          startOfWeek.getMonth(),
          startOfWeek.getDate(),
        );
        validUntil = new Date(validFrom.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;

      case Timeframe.MONTH:
        validFrom = new Date(now.getFullYear(), now.getMonth(), 1);
        validUntil = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        break;

      case Timeframe.YEAR:
        validFrom = new Date(now.getFullYear(), 0, 1);
        validUntil = new Date(now.getFullYear() + 1, 0, 1);
        break;

      default:
        throw new Error(`Invalid timeframe: ${timeframe}`);
    }

    return { validFrom, validUntil };
  }

  async updateForecast(
    zodiacSign: string,
    gender: string,
    timeframe: Timeframe,
  ): Promise<void> {
    try {
      const { validFrom, validUntil } = this.calculateValidityPeriod(timeframe);

      const generatedContent = await this.openAIService.generateForecast(
        zodiacSign,
        gender,
        timeframe,
      );

      await this.forecastModel.findOneAndUpdate(
        {
          zodiacSign: zodiacSign.toLowerCase(),
          gender: gender.toLowerCase(),
          timeframe,
        },
        {
          forecast: generatedContent.forecast,
          details: generatedContent.details,
          validFrom,
          validUntil,
          isGenerated: true,
          lastUpdated: new Date(),
        },
        { upsert: true, new: true },
      );

      this.logger.log(
        `Updated ${timeframe} forecast for ${gender} ${zodiacSign}`,
      );
    } catch (error) {
      this.logger.error(`Failed to update forecast: ${error.message}`);
      throw error;
    }
  }

  async cleanupExpiredForecasts(): Promise<void> {
    const now = new Date();

    const result = await this.forecastModel.deleteMany({
      validUntil: { $lt: now },
    });

    this.logger.log(`Cleaned up ${result.deletedCount} expired forecasts`);
  }

  async getAllForecasts(): Promise<Forecast[]> {
    return this.forecastModel.find().exec();
  }

  async deleteForecast(
    zodiacSign: string,
    gender: string,
    timeframe: Timeframe,
  ): Promise<void> {
    await this.forecastModel.findOneAndDelete({
      zodiacSign: zodiacSign.toLowerCase(),
      gender: gender.toLowerCase(),
      timeframe,
    });
  }
}
