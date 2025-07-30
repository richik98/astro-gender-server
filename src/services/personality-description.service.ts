import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GetSignDescriptionDto,
  PersonalityDescriptionResponseDto,
} from '../dto/personality-description.dto';
import {
  PersonalityDescription,
  PersonalityDescriptionDocument,
} from '../models/personality-description.model';
import { OpenAIService } from './openai.service';

@Injectable()
export class PersonalityDescriptionService {
  private readonly logger = new Logger(PersonalityDescriptionService.name);

  constructor(
    @InjectModel(PersonalityDescription.name)
    private personalityDescriptionModel: Model<PersonalityDescriptionDocument>,
    private openAIService: OpenAIService,
  ) {}

  async getSignDescription(
    dto: GetSignDescriptionDto,
  ): Promise<PersonalityDescriptionResponseDto> {
    const { zodiacSign, gender } = dto;

    // Check if we have this description in the database
    let description = await this.personalityDescriptionModel.findOne({
      zodiacSign: zodiacSign.toLowerCase(),
      gender: gender.toLowerCase(),
    });

    // If not found, generate it using OpenAI
    if (!description) {
      this.logger.log(
        `Generating new personality description for ${gender} ${zodiacSign}`,
      );

      try {
        const generatedContent =
          await this.openAIService.generatePersonalityDescription(
            zodiacSign,
            gender,
          );

        // Save to database
        description = new this.personalityDescriptionModel({
          zodiacSign: zodiacSign.toLowerCase(),
          gender: gender.toLowerCase(),
          description: generatedContent.description,
          traits: generatedContent.traits,
          isGenerated: true,
          lastUpdated: new Date(),
        });
        await description.save();

        this.logger.log(
          `Successfully generated and saved personality description for ${gender} ${zodiacSign}`,
        );
      } catch (error) {
        this.logger.error(
          `Failed to generate personality description: ${error.message}`,
        );
        throw new Error('Failed to generate personality description');
      }
    } else {
      this.logger.log(
        `Retrieved cached personality description for ${gender} ${zodiacSign}`,
      );
    }

    return {
      zodiacSign: description.zodiacSign,
      gender: description.gender,
      description: description.description,
      traits: description.traits,
      isGenerated: description.isGenerated,
      lastUpdated: description.lastUpdated,
    };
  }

  async updatePersonalityDescription(
    zodiacSign: string,
    gender: string,
  ): Promise<void> {
    try {
      const generatedContent =
        await this.openAIService.generatePersonalityDescription(
          zodiacSign,
          gender,
        );

      await this.personalityDescriptionModel.findOneAndUpdate(
        {
          zodiacSign: zodiacSign.toLowerCase(),
          gender: gender.toLowerCase(),
        },
        {
          description: generatedContent.description,
          traits: generatedContent.traits,
          isGenerated: true,
          lastUpdated: new Date(),
        },
        { upsert: true, new: true },
      );

      this.logger.log(
        `Updated personality description for ${gender} ${zodiacSign}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to update personality description: ${error.message}`,
      );
      throw error;
    }
  }

  async getAllDescriptions(): Promise<PersonalityDescription[]> {
    return this.personalityDescriptionModel.find().exec();
  }

  async deleteDescription(zodiacSign: string, gender: string): Promise<void> {
    await this.personalityDescriptionModel.findOneAndDelete({
      zodiacSign: zodiacSign.toLowerCase(),
      gender: gender.toLowerCase(),
    });
  }
}
