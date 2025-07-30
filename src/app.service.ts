import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Astrology is our pointer, vercel what do you fkn want?';
  }
}
