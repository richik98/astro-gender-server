<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Astro Gender Server

A gender-inclusive astrology API built with NestJS that provides zodiac sign detection, personality descriptions, and forecasts for all 72 recognized gender identities.

## 🌟 Features

- **Zodiac Sign Detection**: Mathematical calculation based on birth date, time, and location
- **Personality Descriptions**: AI-generated descriptions for each zodiac sign and gender combination
- **Forecasts**: Time-based forecasts (daily, weekly, monthly, yearly) for all combinations
- **Database Caching**: MongoDB storage to reduce API costs and improve performance
- **Automated Updates**: Cron jobs to keep forecasts current and clean expired data
- **Gender Inclusive**: Support for 72 different gender identities
- **API Documentation**: Swagger/OpenAPI documentation

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd astro-gender-server
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/astro-gender-server
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

4. Start the development server:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`
API documentation at `http://localhost:3000/api`

## 📚 API Endpoints

### 1. Detect Zodiac Sign

**POST** `/astrology/detect_zodiac_sign`

Detects zodiac sign based on birth information.

**Request Body:**

```json
{
  "location": "New York, NY",
  "birthTime": "14:30",
  "birthDate": "1990-05-15"
}
```

**Response:**

```json
{
  "zodiacSign": "Taurus",
  "location": "New York, NY",
  "birthTime": "14:30",
  "birthDate": "1990-05-15",
  "latitude": 40.7128,
  "longitude": -74.006
}
```

### 2. Get Personality Description

**POST** `/astrology/get_sign_description`

Retrieves personality description for a specific zodiac sign and gender.

**Request Body:**

```json
{
  "zodiacSign": "Taurus",
  "gender": "non-binary"
}
```

**Response:**

```json
{
  "zodiacSign": "taurus",
  "gender": "non-binary",
  "description": "As a non-binary Taurus...",
  "traits": {
    "strengths": ["Patient", "Reliable", "Determined"],
    "weaknesses": ["Stubborn", "Possessive"],
    "compatibility": ["Cancer", "Virgo", "Capricorn"],
    "career": ["Finance", "Agriculture", "Interior Design"],
    "love": ["Loyal", "Affectionate", "Protective"]
  },
  "isGenerated": true,
  "lastUpdated": "2024-01-15T10:30:00.000Z"
}
```

### 3. Get Forecast

**POST** `/astrology/get_sign_forecast`

Retrieves forecast for a specific zodiac sign, gender, and timeframe.

**Request Body:**

```json
{
  "zodiacSign": "Taurus",
  "gender": "non-binary",
  "timeframe": "week"
}
```

**Response:**

```json
{
  "zodiacSign": "taurus",
  "gender": "non-binary",
  "timeframe": "week",
  "forecast": "This week brings opportunities for...",
  "details": {
    "love": "Romantic connections may deepen...",
    "career": "Professional growth is highlighted...",
    "health": "Focus on physical well-being...",
    "finance": "Financial decisions require careful consideration...",
    "luck": "Fortune favors your patience..."
  },
  "validFrom": "2024-01-15T00:00:00.000Z",
  "validUntil": "2024-01-22T00:00:00.000Z",
  "isGenerated": true,
  "lastUpdated": "2024-01-15T06:00:00.000Z"
}
```

## 🗄️ Database Schema

### Zodiac Sign Detection

Stores birth information and calculated zodiac signs.

### Personality Descriptions

Caches AI-generated personality descriptions for each zodiac sign and gender combination.

### Forecasts

Stores time-based forecasts with validity periods and automatic cleanup.

## ⏰ Cron Jobs

The system includes automated tasks:

- **Hourly**: Clean up expired forecasts
- **Daily (6 AM)**: Update daily forecasts for all combinations
- **Weekly (Monday 6 AM)**: Update weekly forecasts
- **Monthly (1st 6 AM)**: Update monthly forecasts
- **Yearly (Jan 1st 6 AM)**: Update yearly forecasts

## 🏗️ Architecture

### Components

1. **ZodiacDetectionService**: Mathematical zodiac sign calculation
2. **PersonalityDescriptionService**: Database caching and AI generation
3. **ForecastService**: Time-based forecast management
4. **OpenAIService**: AI content generation
5. **CronService**: Automated database maintenance

### Data Flow

1. **Zodiac Detection**: Pure mathematical calculation
2. **Personality/Forecast**: Check database → Generate if missing → Cache → Return

### Gender Support

The system supports 72 gender identities including:

- Traditional: male, female
- Non-binary identities: non-binary, genderfluid, agender, bigender
- Cultural: two-spirit
- Descriptive: gender creative, gender expansive, gender diverse
- And many more...

## 🔧 Configuration

### Environment Variables

| Variable         | Description               | Default                                         |
| ---------------- | ------------------------- | ----------------------------------------------- |
| `MONGODB_URI`    | MongoDB connection string | `mongodb://localhost:27017/astro-gender-server` |
| `OPENAI_API_KEY` | OpenAI API key            | Required                                        |
| `PORT`           | Server port               | `3000`                                          |

### Supported Timeframes

- `day`: Daily forecasts
- `week`: Weekly forecasts
- `month`: Monthly forecasts
- `year`: Yearly forecasts

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Production Deployment

1. Build the application:

```bash
npm run build
```

2. Start production server:

```bash
npm run start:prod
```

3. Set up MongoDB indexes for optimal performance:

```javascript
// The application automatically creates indexes, but you can verify:
db.personalitydescriptions.createIndex(
  { zodiacSign: 1, gender: 1 },
  { unique: true },
);
db.forecasts.createIndex({
  zodiacSign: 1,
  gender: 1,
  timeframe: 1,
  validFrom: 1,
  validUntil: 1,
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Check the API documentation at `/api`
- Review the logs for detailed error information
- Ensure all environment variables are properly configured

## 🔮 Future Enhancements

- [ ] Geocoding service integration for better location handling
- [ ] Rate limiting for OpenAI API calls
- [ ] User authentication and personalization
- [ ] Webhook notifications for forecast updates
- [ ] Analytics and usage tracking
- [ ] Multi-language support
