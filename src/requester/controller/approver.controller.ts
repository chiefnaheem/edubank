import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApproverService } from "../service/approver.service";

@ApiTags('approver-controller')
@Controller('approver')
export class ApproverController {
  constructor(private readonly approverService: ApproverService) {}

  @Post()

}