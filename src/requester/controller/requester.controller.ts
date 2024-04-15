import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequesterService } from "../service/requester.service";

@ApiTags('requester-controller')
@Controller('requester')
export class RequesterController {
  constructor(private readonly requesterService: RequesterService) {}

  @Post()

}