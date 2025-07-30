/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private readonly logger = new Logger(OpenAIService.name);

  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generatePersonalityDescription(
    zodiacSign: string,
    gender: string,
  ): Promise<{
    description: string;
    traits: {
      strengths: string[];
      weaknesses: string[];
      compatibility: string[];
      career: string[];
      love: string[];
    };
  }> {
    const prompt = `Generate a detailed personality description for a ${gender} ${zodiacSign}. 
    Include a comprehensive description and organize traits into the following categories:
    - Strengths (3-4 traits)
    - Weaknesses (2-3 traits)
    - Compatibility (2-3 compatible signs)
    - Career (3-4 suitable career paths)
    - Love (3-4 love characteristics)
    
    Return the response as a JSON object with 'description' and 'traits' fields.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4.1-nano',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert astrologer specializing in gender-inclusive astrology. Provide detailed, respectful, and accurate personality descriptions.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 2048,
      });

      this.logger.log(`generated response: ${JSON.stringify(response)}`);

      // Parse the response from OpenAI
      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content received from OpenAI');
      }
      return JSON.parse(content);
    } catch (error) {
      this.logger.error(
        `Error generating personality description: ${error.message}`,
      );
      throw new Error('Failed to generate personality description');
    }
  }

  async generateForecast(
    zodiacSign: string,
    gender: string,
    timeframe: string,
  ): Promise<{
    forecast: string;
    details: {
      love: string;
      career: string;
      health: string;
      finance: string;
      luck: string;
    };
  }> {
    const prompt = `Generate a ${timeframe} forecast for a ${gender} ${zodiacSign}. 
    Include a general forecast and specific details for:
    - Love and relationships
    - Career and work
    - Health and wellness
    - Finance and money
    - Luck and opportunities
    
    Return the response as a JSON object with 'forecast' and 'details' fields.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4.1-nano',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert astrologer specializing in gender-inclusive astrology. Provide detailed, respectful, and accurate forecasts.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 2048,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content received from OpenAI');
      }
      return JSON.parse(content);
    } catch (error) {
      this.logger.error(`Error generating forecast: ${error.message}`);
      throw new Error('Failed to generate forecast');
    }
  }
}

// export class OpenAIService {
//     private readonly logger = new Logger(OpenAIService.name);
//     private readonly apiKey: string;
//     private readonly baseUrl = 'https://api.openai.com/v1/chat/completions';

//     constructor(private configService: ConfigService) {
//       this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
//     }

//     async generatePersonalityDescription(
//       zodiacSign: string,
//       gender: string,
//     ): Promise<{
//       description: string;
//       traits: {
//         strengths: string[];
//         weaknesses: string[];
//         compatibility: string[];
//         career: string[];
//         love: string[];
//       };
//     }> {
//       const prompt = `Generate a detailed personality description for a ${gender} ${zodiacSign}.
//       Include a comprehensive description and organize traits into the following categories:
//       - Strengths (3-4 traits)
//       - Weaknesses (2-3 traits)
//       - Compatibility (2-3 compatible signs)
//       - Career (3-4 suitable career paths)
//       - Love (3-4 love characteristics)

//       Return the response as a JSON object with 'description' and 'traits' fields.`;

//       try {
//         const response = await axios.post(
//           this.baseUrl,
//           {
//             model: 'gpt-3.5-turbo',
//             messages: [
//               {
//                 role: 'system',
//                 content:
//                   'You are an expert astrologer specializing in gender-inclusive astrology. Provide detailed, respectful, and accurate personality descriptions.',
//               },
//               {
//                 role: 'user',
//                 content: prompt,
//               },
//             ],
//             temperature: 0.7,
//             max_tokens: 1000,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${this.apiKey}`,
//               'Content-Type': 'application/json',
//             },
//           },
//         );

//         const content = response.data.choices[0].message.content;
//         return JSON.parse(content);
//       } catch (error) {
//         this.logger.error(
//           `Error generating personality description: ${error.message}`,
//         );
//         throw new Error('Failed to generate personality description');
//       }
//     }

//     async generateForecast(
//       zodiacSign: string,
//       gender: string,
//       timeframe: string,
//     ): Promise<{
//       forecast: string;
//       details: {
//         love: string;
//         career: string;
//         health: string;
//         finance: string;
//         luck: string;
//       };
//     }> {
//       const prompt = `Generate a ${timeframe} forecast for a ${gender} ${zodiacSign}.
//       Include a general forecast and specific details for:
//       - Love and relationships
//       - Career and work
//       - Health and wellness
//       - Finance and money
//       - Luck and opportunities

//       Return the response as a JSON object with 'forecast' and 'details' fields.`;

//       try {
//         const response = await axios.post(
//           this.baseUrl,
//           {
//             model: 'gpt-3.5-turbo',
//             messages: [
//               {
//                 role: 'system',
//                 content:
//                   'You are an expert astrologer specializing in gender-inclusive astrology. Provide detailed, respectful, and accurate forecasts.',
//               },
//               {
//                 role: 'user',
//                 content: prompt,
//               },
//             ],
//             temperature: 0.8,
//             max_tokens: 1200,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${this.apiKey}`,
//               'Content-Type': 'application/json',
//             },
//           },
//         );

//         const content = response.data.choices[0].message.content;
//         return JSON.parse(content);
//       } catch (error) {
//         this.logger.error(`Error generating forecast: ${error.message}`);
//         throw new Error('Failed to generate forecast');
//       }
//     }
//   }
