import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApproverController } from './controller/approver.controller';
import { RequestController } from './controller/request.controller';
import { RequesterController } from './controller/requester.controller';
import { ApproverEntity } from './entities/approver.entity';
import { RequestEntity } from './entities/request.entity';
import { RequesterEntity } from './entities/requester.entity';
import { ApproverService } from './service/approver.service';
import { RequestService } from './service/request.service';
import { RequesterService } from './service/requester.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEntity, RequesterEntity, ApproverEntity]),
  ],
  providers: [ApproverService, RequesterService, RequestService],
  controllers: [ApproverController, RequestController, RequesterController],
  exports: [ApproverService, RequesterService, RequestService],
})
export class RequesterModule {}
