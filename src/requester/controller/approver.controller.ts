import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/interface/response.interface';
import { ApproverDto } from '../dto/approver.dto';
import { ApproverGuard } from '../guards/approver.guard';
import { ApproverService } from '../service/approver.service';
import { RequestService } from '../service/request.service';

@ApiTags('approver-controller')
@Controller('approver')
export class ApproverController {
  constructor(
    private readonly approverService: ApproverService,
    private readonly requestService: RequestService,
  ) {}

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

  //   @ApiQuery({
  //     type: Boolean,
  //     example: false,
  //     description: 'Action to take',
  //   })
  //   @ApiQuery({
  //     name: 'requestId',
  //     type: String,
  //     description: 'Id of the request to approve',
  //   })
  //   @ApiParam({
  //     description: 'ID of the approver',
  //   })
  //   @Patch('approve-deny-request/:id')
  //   @UseGuards(ApproverGuard)
  //   async approveOrDeny(
  //     @Param('id', ParseUUIDPipe) id: string,
  //     @Query('requestId', ParseUUIDPipe) requestId: string,
  //     @Query('isApproved') isApproved: boolean,
  //   ): Promise<ResponseDto> {
  //     const data = await this.requestService.updateRequestStatus(id, isApproved);
  //     return {
  //       statusCode: 200,
  //       message: 'success',
  //       data,
  //     };
  //   }

  /**
   * Approve or deny a request
   * @summary Approve or deny a request by the approver
   * @param id ID of the approver
   * @param requestId ID of the request to approve
   * @param isApproved Action to take (true for approve, false for deny)
   * @returns Response indicating success or failure
   */
  @Patch('approve-deny-request/:id')
  @UseGuards(ApproverGuard)
  @ApiParam({
    name: 'id',
    description: 'ID of the approver',
  })
  @ApiQuery({
    name: 'requestId',
    type: String,
    description: 'ID of the request to approve',
  })
  @ApiQuery({
    name: 'isApproved',
    type: Boolean,
    example: false,
    description: 'Action to take (true for approve, false for deny)',
  })
  async approveOrDeny(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('requestId', ParseUUIDPipe) requestId: string,
    @Query('isApproved') isApproved: boolean,
  ): Promise<ResponseDto> {
    const data = await this.requestService.updateRequestStatus(id, isApproved);
    return {
      statusCode: 200,
      message: 'success',
      data,
    };
  }
}
