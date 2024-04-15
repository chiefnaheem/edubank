import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/interface/response.interface';
import { ApproverDto } from '../dto/approver.dto';
import { ApproverService } from '../service/approver.service';

@ApiTags('approver-controller')
@Controller('approver')
export class ApproverController {
  constructor(private readonly approverService: ApproverService) {}

  @Post()
  async createApprover(@Body() body: ApproverDto): Promise<ResponseDto> {
    const approver = await this.approverService.createApprover(body);
    return {
      statusCode: 200,
      message: 'success',
      data: approver,
    };
  }

  @Get()
  async getApprovers(): Promise<ResponseDto> {
    const approvers = await this.approverService.findApprovers();
    return {
      statusCode: 200,
      message: 'success',
      data: approvers,
    };
  }

  @Get(':id')
  async getApprover(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDto> {
    const approver = await this.approverService.findApprover(id);
    return {
      statusCode: 200,
      message: 'success',
      data: approver,
    };
  }
}
