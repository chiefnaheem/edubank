import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestEntity } from '../entities/request.entity';

@Injectable()
export class RequestService {
  private readonly logger = new Logger(RequestService.name);
  constructor(
    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
  ) {}

  async createRequest(request: Partial<RequestEntity>): Promise<RequestEntity> {
    try {
      this.logger.debug(
        `Creating request with data ${JSON.stringify(request)}`,
      );
      const data = this.requestRepository.create(request);
      return await this.requestRepository.save(data);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findRequests(): Promise<RequestEntity[]> {
    try {
      const data = await this.requestRepository.find();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findRequest(id: string): Promise<RequestEntity | undefined> {
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
