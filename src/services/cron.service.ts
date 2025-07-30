/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ForecastService } from './forecast.service';
import { PersonalityDescriptionService } from './personality-description.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private forecastService: ForecastService,
    private personalityDescriptionService: PersonalityDescriptionService,
  ) {}

  // Clean up expired forecasts every hour
  @Cron(CronExpression.EVERY_HOUR)
  async cleanupExpiredForecasts() {
    this.logger.log('Starting expired forecasts cleanup...');
    try {
      await this.forecastService.cleanupExpiredForecasts();
      this.logger.log('Expired forecasts cleanup completed successfully');
    } catch (error) {
      this.logger.error(
        `Failed to cleanup expired forecasts: ${error.message}`,
      );
    }
  }

  // Update daily forecasts every day at 6 AM
  //   @Cron('0 6 * * *')
  //   async updateDailyForecasts() {
  //     this.logger.log('Starting daily forecast updates...');
  //     try {
  //       const zodiacSigns = [
  //         'Aries',
  //         'Taurus',
  //         'Gemini',
  //         'Cancer',
  //         'Leo',
  //         'Virgo',
  //         'Libra',
  //         'Scorpio',
  //         'Sagittarius',
  //         'Capricorn',
  //         'Aquarius',
  //         'Pisces',
  //       ];

  //       const genders = [
  //         'male',
  //         'female',
  //         'non-binary',
  //         'genderfluid',
  //         'agender',
  //         'bigender',
  //         'demiboy',
  //         'demigirl',
  //         'genderqueer',
  //         'neutrois',
  //         'pangender',
  //         'polygender',
  //         'two-spirit',
  //         'gender nonconforming',
  //         'gender variant',
  //         'gender creative',
  //         'gender expansive',
  //         'gender diverse',
  //         'gender independent',
  //         'gender neutral',
  //         'gender questioning',
  //         'gender exploring',
  //         'gender journeying',
  //         'gender evolving',
  //         'gender authentic',
  //         'gender true',
  //         'gender real',
  //         'gender genuine',
  //         'gender natural',
  //         'gender organic',
  //         'gender original',
  //         'gender unique',
  //         'gender special',
  //         'gender rare',
  //         'gender precious',
  //         'gender valuable',
  //         'gender important',
  //         'gender significant',
  //         'gender meaningful',
  //         'gender purposeful',
  //         'gender intentional',
  //         'gender conscious',
  //         'gender aware',
  //         'gender mindful',
  //         'gender present',
  //         'gender here',
  //         'gender now',
  //         'gender alive',
  //         'gender vibrant',
  //         'gender dynamic',
  //         'gender active',
  //         'gender engaged',
  //         'gender involved',
  //         'gender participatory',
  //         'gender collaborative',
  //         'gender cooperative',
  //         'gender supportive',
  //         'gender encouraging',
  //         'gender nurturing',
  //         'gender caring',
  //         'gender loving',
  //         'gender kind',
  //         'gender gentle',
  //         'gender soft',
  //         'gender tender',
  //         'gender warm',
  //         'gender welcoming',
  //         'gender inclusive',
  //         'gender accepting',
  //         'gender embracing',
  //         'gender celebrating',
  //         'gender honoring',
  //         'gender respecting',
  //         'gender valuing',
  //         'gender appreciating',
  //         'gender recognizing',
  //         'gender acknowledging',
  //       ];

  //       for (const zodiacSign of zodiacSigns) {
  //         for (const gender of genders) {
  //           try {
  //             await this.forecastService.updateForecast(
  //               zodiacSign,
  //               gender,
  //               'day',
  //             );
  //             // Add small delay to avoid overwhelming the API
  //             await new Promise((resolve) => setTimeout(resolve, 100));
  //           } catch (error) {
  //             this.logger.error(
  //               `Failed to update daily forecast for ${gender} ${zodiacSign}: ${error.message}`,
  //             );
  //           }
  //         }
  //       }

  //       this.logger.log('Daily forecast updates completed');
  //     } catch (error) {
  //       this.logger.error(`Failed to update daily forecasts: ${error.message}`);
  //     }
  //   }

  // Update weekly forecasts every Monday at 6 AM
  //   @Cron('0 6 * * 1')
  //   async updateWeeklyForecasts() {
  //     this.logger.log('Starting weekly forecast updates...');
  //     try {
  //       const zodiacSigns = [
  //         'Aries',
  //         'Taurus',
  //         'Gemini',
  //         'Cancer',
  //         'Leo',
  //         'Virgo',
  //         'Libra',
  //         'Scorpio',
  //         'Sagittarius',
  //         'Capricorn',
  //         'Aquarius',
  //         'Pisces',
  //       ];

  //       const genders = [
  //         'male',
  //         'female',
  //         'non-binary',
  //         'genderfluid',
  //         'agender',
  //         'bigender',
  //         'demiboy',
  //         'demigirl',
  //         'genderqueer',
  //         'neutrois',
  //         'pangender',
  //         'polygender',
  //         'two-spirit',
  //         'gender nonconforming',
  //         'gender variant',
  //         'gender creative',
  //         'gender expansive',
  //         'gender diverse',
  //         'gender independent',
  //         'gender neutral',
  //         'gender questioning',
  //         'gender exploring',
  //         'gender journeying',
  //         'gender evolving',
  //         'gender authentic',
  //         'gender true',
  //         'gender real',
  //         'gender genuine',
  //         'gender natural',
  //         'gender organic',
  //         'gender original',
  //         'gender unique',
  //         'gender special',
  //         'gender rare',
  //         'gender precious',
  //         'gender valuable',
  //         'gender important',
  //         'gender significant',
  //         'gender meaningful',
  //         'gender purposeful',
  //         'gender intentional',
  //         'gender conscious',
  //         'gender aware',
  //         'gender mindful',
  //         'gender present',
  //         'gender here',
  //         'gender now',
  //         'gender alive',
  //         'gender vibrant',
  //         'gender dynamic',
  //         'gender active',
  //         'gender engaged',
  //         'gender involved',
  //         'gender participatory',
  //         'gender collaborative',
  //         'gender cooperative',
  //         'gender supportive',
  //         'gender encouraging',
  //         'gender nurturing',
  //         'gender caring',
  //         'gender loving',
  //         'gender kind',
  //         'gender gentle',
  //         'gender soft',
  //         'gender tender',
  //         'gender warm',
  //         'gender welcoming',
  //         'gender inclusive',
  //         'gender accepting',
  //         'gender embracing',
  //         'gender celebrating',
  //         'gender honoring',
  //         'gender respecting',
  //         'gender valuing',
  //         'gender appreciating',
  //         'gender recognizing',
  //         'gender acknowledging',
  //       ];

  //       for (const zodiacSign of zodiacSigns) {
  //         for (const gender of genders) {
  //           try {
  //             await this.forecastService.updateForecast(
  //               zodiacSign,
  //               gender,
  //               'week',
  //             );
  //             await new Promise((resolve) => setTimeout(resolve, 100));
  //           } catch (error) {
  //             this.logger.error(
  //               `Failed to update weekly forecast for ${gender} ${zodiacSign}: ${error.message}`,
  //             );
  //           }
  //         }
  //       }

  //       this.logger.log('Weekly forecast updates completed');
  //     } catch (error) {
  //       this.logger.error(`Failed to update weekly forecasts: ${error.message}`);
  //     }
  //   }

  // Update monthly forecasts on the 1st of each month at 6 AM
  //   @Cron('0 6 1 * *')
  //   async updateMonthlyForecasts() {
  //     this.logger.log('Starting monthly forecast updates...');
  //     try {
  //       const zodiacSigns = [
  //         'Aries',
  //         'Taurus',
  //         'Gemini',
  //         'Cancer',
  //         'Leo',
  //         'Virgo',
  //         'Libra',
  //         'Scorpio',
  //         'Sagittarius',
  //         'Capricorn',
  //         'Aquarius',
  //         'Pisces',
  //       ];

  //       const genders = [
  //         'male',
  //         'female',
  //         'non-binary',
  //         'genderfluid',
  //         'agender',
  //         'bigender',
  //         'demiboy',
  //         'demigirl',
  //         'genderqueer',
  //         'neutrois',
  //         'pangender',
  //         'polygender',
  //         'two-spirit',
  //         'gender nonconforming',
  //         'gender variant',
  //         'gender creative',
  //         'gender expansive',
  //         'gender diverse',
  //         'gender independent',
  //         'gender neutral',
  //         'gender questioning',
  //         'gender exploring',
  //         'gender journeying',
  //         'gender evolving',
  //         'gender authentic',
  //         'gender true',
  //         'gender real',
  //         'gender genuine',
  //         'gender natural',
  //         'gender organic',
  //         'gender original',
  //         'gender unique',
  //         'gender special',
  //         'gender rare',
  //         'gender precious',
  //         'gender valuable',
  //         'gender important',
  //         'gender significant',
  //         'gender meaningful',
  //         'gender purposeful',
  //         'gender intentional',
  //         'gender conscious',
  //         'gender aware',
  //         'gender mindful',
  //         'gender present',
  //         'gender here',
  //         'gender now',
  //         'gender alive',
  //         'gender vibrant',
  //         'gender dynamic',
  //         'gender active',
  //         'gender engaged',
  //         'gender involved',
  //         'gender participatory',
  //         'gender collaborative',
  //         'gender cooperative',
  //         'gender supportive',
  //         'gender encouraging',
  //         'gender nurturing',
  //         'gender caring',
  //         'gender loving',
  //         'gender kind',
  //         'gender gentle',
  //         'gender soft',
  //         'gender tender',
  //         'gender warm',
  //         'gender welcoming',
  //         'gender inclusive',
  //         'gender accepting',
  //         'gender embracing',
  //         'gender celebrating',
  //         'gender honoring',
  //         'gender respecting',
  //         'gender valuing',
  //         'gender appreciating',
  //         'gender recognizing',
  //         'gender acknowledging',
  //       ];

  //       for (const zodiacSign of zodiacSigns) {
  //         for (const gender of genders) {
  //           try {
  //             await this.forecastService.updateForecast(
  //               zodiacSign,
  //               gender,
  //               'month',
  //             );
  //             await new Promise((resolve) => setTimeout(resolve, 100));
  //           } catch (error) {
  //             this.logger.error(
  //               `Failed to update monthly forecast for ${gender} ${zodiacSign}: ${error.message}`,
  //             );
  //           }
  //         }
  //       }

  //       this.logger.log('Monthly forecast updates completed');
  //     } catch (error) {
  //       this.logger.error(`Failed to update monthly forecasts: ${error.message}`);
  //     }
  //   }

  // Update yearly forecasts on January 1st at 6 AM
  //   @Cron('0 6 1 1 *')
  //   async updateYearlyForecasts() {
  //     this.logger.log('Starting yearly forecast updates...');
  //     try {
  //       const zodiacSigns = [
  //         'Aries',
  //         'Taurus',
  //         'Gemini',
  //         'Cancer',
  //         'Leo',
  //         'Virgo',
  //         'Libra',
  //         'Scorpio',
  //         'Sagittarius',
  //         'Capricorn',
  //         'Aquarius',
  //         'Pisces',
  //       ];

  //       const genders = [
  //         'male',
  //         'female',
  //         'non-binary',
  //         'genderfluid',
  //         'agender',
  //         'bigender',
  //         'demiboy',
  //         'demigirl',
  //         'genderqueer',
  //         'neutrois',
  //         'pangender',
  //         'polygender',
  //         'two-spirit',
  //         'gender nonconforming',
  //         'gender variant',
  //         'gender creative',
  //         'gender expansive',
  //         'gender diverse',
  //         'gender independent',
  //         'gender neutral',
  //         'gender questioning',
  //         'gender exploring',
  //         'gender journeying',
  //         'gender evolving',
  //         'gender authentic',
  //         'gender true',
  //         'gender real',
  //         'gender genuine',
  //         'gender natural',
  //         'gender organic',
  //         'gender original',
  //         'gender unique',
  //         'gender special',
  //         'gender rare',
  //         'gender precious',
  //         'gender valuable',
  //         'gender important',
  //         'gender significant',
  //         'gender meaningful',
  //         'gender purposeful',
  //         'gender intentional',
  //         'gender conscious',
  //         'gender aware',
  //         'gender mindful',
  //         'gender present',
  //         'gender here',
  //         'gender now',
  //         'gender alive',
  //         'gender vibrant',
  //         'gender dynamic',
  //         'gender active',
  //         'gender engaged',
  //         'gender involved',
  //         'gender participatory',
  //         'gender collaborative',
  //         'gender cooperative',
  //         'gender supportive',
  //         'gender encouraging',
  //         'gender nurturing',
  //         'gender caring',
  //         'gender loving',
  //         'gender kind',
  //         'gender gentle',
  //         'gender soft',
  //         'gender tender',
  //         'gender warm',
  //         'gender welcoming',
  //         'gender inclusive',
  //         'gender accepting',
  //         'gender embracing',
  //         'gender celebrating',
  //         'gender honoring',
  //         'gender respecting',
  //         'gender valuing',
  //         'gender appreciating',
  //         'gender recognizing',
  //         'gender acknowledging',
  //       ];

  //       for (const zodiacSign of zodiacSigns) {
  //         for (const gender of genders) {
  //           try {
  //             await this.forecastService.updateForecast(
  //               zodiacSign,
  //               gender,
  //               'year',
  //             );
  //             await new Promise((resolve) => setTimeout(resolve, 100));
  //           } catch (error) {
  //             this.logger.error(
  //               `Failed to update yearly forecast for ${gender} ${zodiacSign}: ${error.message}`,
  //             );
  //           }
  //         }
  //       }

  //       this.logger.log('Yearly forecast updates completed');
  //     } catch (error) {
  //       this.logger.error(`Failed to update yearly forecasts: ${error.message}`);
  //     }
  //   }
}
