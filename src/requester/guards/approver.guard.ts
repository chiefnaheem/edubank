import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestType } from '../entities/request.entity';
import { ApproverService } from '../service/approver.service';
import { RequestService } from '../service/request.service';

@Injectable()
export class ApproverGuard implements CanActivate {
  private readonly logger = new Logger('Approver Guard');
  constructor(
    private readonly approverService: ApproverService,
    private readonly requestService: RequestService,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const { id } = request.params;
      const { requestId } = request.query;

      if (!id || !requestId) {
        throw new BadRequestException('Invalid IDs provided');
      }

      const approver = await this.approverService.findApprover(id);
      const requestToApprove = await this.requestService.findRequest(requestId);

      if (!approver || !requestToApprove) {
        throw new NotFoundException('Approver or Request Not Found');
      }

      const isRequestExpired = await this.requestService.isRequestExpired(
        requestId,
      );
      if (isRequestExpired) {
        throw new BadRequestException('Request has expired');
      }

      const approverAllowedTypes = approver.approvedRequestTypes;
      const requestType = requestToApprove.type;

      switch (true) {
        case approverAllowedTypes.includes(RequestType.A):
          throw new UnauthorizedException(
            'You are not allowed to approve any request',
          );
        case approverAllowedTypes.includes(RequestType.B) &&
          requestType === RequestType.A:
          return true;
        case approverAllowedTypes.includes(RequestType.C) &&
          [RequestType.A, RequestType.B].includes(requestType):
          return true;
        default:
          throw new UnauthorizedException(
            'You are not allowed to approve this request',
          );
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
