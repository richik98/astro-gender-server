/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DetectZodiacSignDto,
  ZodiacDetectionResponseDto,
} from '../dto/zodiac-detection.dto';
import { ZodiacSign, ZodiacSignDocument } from '../models/zodiac-sign.model';

@Injectable()
export class ZodiacDetectionService {
  private readonly zodiacSigns = [
    {
      name: 'Capricorn',
      startMonth: 12,
      startDay: 22,
      endMonth: 1,
      endDay: 19,
    },
    { name: 'Aquarius', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { name: 'Pisces', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    { name: 'Aries', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { name: 'Taurus', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { name: 'Gemini', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
    { name: 'Cancer', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
    { name: 'Leo', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { name: 'Virgo', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { name: 'Libra', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
    { name: 'Scorpio', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
    {
      name: 'Sagittarius',
      startMonth: 11,
      startDay: 22,
      endMonth: 12,
      endDay: 21,
    },
  ];

  constructor(
    @InjectModel(ZodiacSign.name)
    private zodiacSignModel: Model<ZodiacSignDocument>,
  ) {}

  async detectZodiacSign(
    dto: DetectZodiacSignDto,
  ): Promise<ZodiacDetectionResponseDto> {
    const { location, birthTime, birthDate } = dto;

    // Parse birth date
    const birthDateObj = new Date(birthDate);
    const month = birthDateObj.getMonth() + 1; // getMonth() returns 0-11
    const day = birthDateObj.getDate();

    // Find zodiac sign
    const zodiacSign = this.calculateZodiacSign(month, day);

    // Get coordinates (simplified - in production you'd use a geocoding service)
    //const coordinates = await this.getCoordinates(location);

    //mockdata for testing purposes only
    const coordinates = { latitude: 0, longitude: 0 };

    // Save to database
    const zodiacRecord = new this.zodiacSignModel({
      location,
      birthTime,
      birthDate,
      zodiacSign,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
    await zodiacRecord.save();

    return {
      zodiacSign,
      location,
      birthTime,
      birthDate,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };
  }

  private calculateZodiacSign(month: number, day: number): string {
    for (const sign of this.zodiacSigns) {
      if (this.isDateInRange(month, day, sign)) {
        return sign.name;
      }
    }
    return 'Unknown';
  }

  private isDateInRange(month: number, day: number, sign: any): boolean {
    if (sign.startMonth === 12 && sign.endMonth === 1) {
      // Handle Capricorn (December 22 - January 19)
      return (
        (month === 12 && day >= sign.startDay) ||
        (month === 1 && day <= sign.endDay)
      );
    } else {
      // Handle other signs
      if (month === sign.startMonth) {
        return day >= sign.startDay;
      } else if (month === sign.endMonth) {
        return day <= sign.endDay;
      } else if (month > sign.startMonth && month < sign.endMonth) {
        return true;
      }
    }
    return false;
  }

  private async getCoordinates(
    location: string,
  ): Promise<{ latitude: number; longitude: number }> {
    // This is a simplified implementation
    // In production, you'd use a geocoding service like Google Maps API or OpenStreetMap
    const mockCoordinates: {
      [key: string]: { latitude: number; longitude: number };
    } = {
      'New York, NY': { latitude: 40.7128, longitude: -74.006 },
      'London, UK': { latitude: 51.5074, longitude: -0.1278 },
      'Tokyo, Japan': { latitude: 35.6762, longitude: 139.6503 },
      'Sydney, Australia': { latitude: -33.8688, longitude: 151.2093 },
      'Moscow, Russia': { latitude: 55.7558, longitude: 37.6176 },
    };

    return mockCoordinates[location] || { latitude: 0, longitude: 0 };
  }
}
