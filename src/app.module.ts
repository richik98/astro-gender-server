import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Models
import { Forecast, ForecastSchema } from './models/forecast.model';
import {
  PersonalityDescription,
  PersonalityDescriptionSchema,
} from './models/personality-description.model';
import { ZodiacSign, ZodiacSignSchema } from './models/zodiac-sign.model';

// Services
import { CronService } from './services/cron.service';
import { ForecastService } from './services/forecast.service';
import { OpenAIService } from './services/openai.service';
import { PersonalityDescriptionService } from './services/personality-description.service';
import { ZodiacDetectionService } from './services/zodiac-detection.service';

// Controllers
import { AstrologyController } from './controllers/astrology.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
        'mongodb://localhost:27017/astro-gender-server',
    ),
    MongooseModule.forFeature([
      { name: ZodiacSign.name, schema: ZodiacSignSchema },
      {
        name: PersonalityDescription.name,
        schema: PersonalityDescriptionSchema,
      },
      { name: Forecast.name, schema: ForecastSchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, AstrologyController],
  providers: [
    AppService,
    ZodiacDetectionService,
    PersonalityDescriptionService,
    ForecastService,
    OpenAIService,
    CronService,
  ],
})
export class AppModule {}
