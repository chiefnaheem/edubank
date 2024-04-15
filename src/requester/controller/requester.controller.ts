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
import { RequesterDto } from '../dto/requester.dto';
import { RequesterService } from '../service/requester.service';

@ApiTags('requester-controller')
@Controller('requester')
export class RequesterController {
  constructor(private readonly requesterService: RequesterService) {}

  @Post()
  async createRequester(@Body() body: RequesterDto): Promise<ResponseDto> {
    const requester = await this.requesterService.createRequester(body);
    return {
      statusCode: 200,
      message: 'success',
      data: requester,
    };
  }

  @Get()
  async getRequesters(): Promise<ResponseDto> {
    const requesters = await this.requesterService.findRequesters();
    return {
      statusCode: 200,
      message: 'success',
      data: requesters,
    };
  }

  @Get(':id')
  async getRequest(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDto> {
    const requester = await this.requesterService.findRequester(id);
    return {
      statusCode: 200,
      message: 'success',
      data: requester,
    };
  }
}
