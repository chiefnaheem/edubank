import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApproverEntity } from '../entities/approver.entity';
import { RequestEntity } from '../entities/request.entity';

@Injectable()
export class ApproverService {
  private readonly logger = new Logger(ApproverService.name);
  constructor(
    @InjectRepository(ApproverEntity)
    private approverRepository: Repository<ApproverEntity>,
  ) {}

  async createApprover(
    request: Partial<ApproverEntity>,
  ): Promise<ApproverEntity> {
    try {
      this.logger.debug(
        `Creating request with data ${JSON.stringify(request)}`,
      );
      const data = this.approverRepository.create(request);
      return await this.approverRepository.save(data);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findApprovers(): Promise<ApproverEntity[]> {
    try {
      const data = await this.approverRepository.find();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findApprover(id: string): Promise<ApproverEntity | undefined> {
    try {
      const expanse = await this.approverRepository.findOne({
        where: { id },
      });

      return expanse;
    } catch (error) {
      throw error;
    }
  }
}
