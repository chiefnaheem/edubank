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
  //   async canActivate(context: ExecutionContext) {
  //     try {
  //       const request = context.switchToHttp().getRequest();
  //       const { id } = request.params;
  //       const { requestId } = request.query;
  //       const approver = await this.approverService.findApprover(id);

  //       const requestToApprove = await this.requestService.findRequest(requestId);

  //       if (!approver || !requestToApprove) {
  //         throw new BadRequestException('Approver or Request Not Found');
  //       }

  //       const approverAllowedType = approver.approvedRequestTypes;

  //       if (approverAllowedType.length > 0) {
  //         if (approverAllowedType.includes(RequestType.A)) {
  //           throw new UnauthorizedException(
  //             'You are not allowed to approve any request',
  //           );
  //         }
  //         if (
  //           approverAllowedType.includes(RequestType.B) &&
  //           requestToApprove.type === RequestType.A
  //         ) {
  //           return true;
  //         }

  //         if (
  //           approverAllowedType.includes(RequestType.C) &&
  //           (requestToApprove.type === RequestType.A ||
  //             requestToApprove.type === RequestType.B)
  //         ) {
  //           return true;
  //         }
  //       }
  //     } catch (error) {
  //       this.logger.error(error);
  //       throw error;
  //     }
  //   }

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const { id } = request.params;
      const { requestId } = request.query;

      // Validate input IDs
      if (!id || !requestId) {
        throw new BadRequestException('Invalid IDs provided');
      }

      const approver = await this.approverService.findApprover(id);
      const requestToApprove = await this.requestService.findRequest(requestId);

      if (!approver || !requestToApprove) {
        throw new NotFoundException('Approver or Request Not Found');
      }

      const approverAllowedTypes = approver.approvedRequestTypes;
      const requestType = requestToApprove.type;

      // Check for approval eligibility using a switch statement
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
