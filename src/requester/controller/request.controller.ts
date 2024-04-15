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
import { RequestDto } from '../dto/request.dto';
import { RequestService } from '../service/request.service';
import { RequesterService } from '../service/requester.service';

@ApiTags('request-controller')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  async createRequest(@Body() body: RequestDto): Promise<ResponseDto> {
    const approver = await this.requestService.createRequest(body);
    return {
      statusCode: 200,
      message: 'success',
      data: approver,
    };
  }

  @Get()
  async getRequests(): Promise<ResponseDto> {
    const approvers = await this.requestService.findRequests();
    return {
      statusCode: 200,
      message: 'success',
      data: approvers,
    };
  }

  @Get(':id')
  async getRequest(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDto> {
    const approver = await this.requestService.findRequest(id);
    return {
      statusCode: 200,
      message: 'success',
      data: approver,
    };
  }
}
