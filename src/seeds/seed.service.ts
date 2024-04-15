import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class SeedsService implements OnModuleInit {
  private readonly logger = new Logger(SeedsService.name);
  constructor() {}
  async onModuleInit() {
    try {
      this.logger.log('Seeding completed!');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
