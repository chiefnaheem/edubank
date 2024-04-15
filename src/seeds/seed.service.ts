import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class SeedsService implements OnModuleInit {
  private readonly logger = new Logger(SeedsService.name);
  constructor(private readonly userService: UserService) {}
  async onModuleInit() {
    try {
      this.logger.log('Seeding data...');
      const adminExists = await this.userService.findAdminExists();
      if (!adminExists) {
        await this.userService.createUser({
          email: 'karan.prajapati@aeliusventure.com',
          password: hashPassword('Karan353463*&'),
          firstName: 'Karan',
          lastName: 'Prajapati',
          role: UserRole.ADMIN,
          address: 'UK',
          phoneNumber: '0704289711',
        });
      }
      this.logger.log('Seeding completed!');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
