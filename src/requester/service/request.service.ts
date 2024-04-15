import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isPast } from 'date-fns';
import { Repository } from 'typeorm';
import { RequestEntity } from '../entities/request.entity';
import { RequesterService } from './requester.service';

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
      const data = await this.requestRepository.find({
        relations: ['requester'],
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findRequest(id: string): Promise<RequestEntity | undefined> {
    try {
      const expanse = await this.requestRepository.findOne({
        where: { id },
        relations: ['requester'],
      });

      return expanse;
    } catch (error) {
      throw error;
    }
  }

  async isRequestExpired(requestId: string): Promise<boolean> {
    try {
      const request = await this.findRequest(requestId);
      if (!request) {
        throw new NotFoundException(`Request with ID ${requestId} not found`);
      }
      const expirationDate = request.expirationDate;
      return isPast(expirationDate);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
