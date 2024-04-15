import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequesterEntity } from '../entities/requester.entity';

@Injectable()
export class RequesterService {
  private readonly logger = new Logger(RequesterService.name);
  constructor(
    @InjectRepository(RequesterEntity)
    private requestRepository: Repository<RequesterEntity>,
  ) {}

  async createRequester(
    requester: Partial<RequesterEntity>,
  ): Promise<RequesterEntity> {
    try {
      this.logger.debug(
        `Creating request with data ${JSON.stringify(requester)}`,
      );
      const data = this.requestRepository.create(requester);
      return await this.requestRepository.save(data);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findRequesters(): Promise<RequesterEntity[]> {
    try {
      const data = await this.requestRepository.find();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findRequester(id: string): Promise<RequesterEntity | undefined> {
    try {
      const expanse = await this.requestRepository.findOne({
        where: { id },
      });

      return expanse;
    } catch (error) {
      throw error;
    }
  }
}
